/* Giọng Chuẩn Global — client-side STEM evidence sync. */
(() => {
  "use strict";
  const STORAGE_KEY = "giongchuan.stem.progress.v1";
  const DEVICE_KEY = "giongchuan.stem.device.v1";
  const MAX_EVENTS = 120;
  const memoryStore = new Map();
  const storage = {
    getItem(key) { try { return localStorage.getItem(key); } catch { return memoryStore.get(key) || null; } },
    setItem(key, value) { try { localStorage.setItem(key, value); } catch { memoryStore.set(key, value); } },
    removeItem(key) { try { localStorage.removeItem(key); } catch { memoryStore.delete(key); } },
  };

  const randomId = () => globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `device-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
  const getDeviceId = () => {
    let id = storage.getItem(DEVICE_KEY);
    if (!id) { id = randomId(); storage.setItem(DEVICE_KEY, id); }
    return id;
  };
  const readEvents = () => {
    try { const value = JSON.parse(storage.getItem(STORAGE_KEY) || "[]"); return Array.isArray(value) ? value : []; }
    catch { return []; }
  };
  const writeEvents = events => storage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  const sanitizeDetails = (details = {}) => {
    const allowed = {};
    for (const [key, value] of Object.entries(details)) {
      if (!/^[a-zA-Z0-9_-]{1,40}$/.test(key)) continue;
      if (["string","number","boolean"].includes(typeof value)) allowed[key] = typeof value === "string" ? value.slice(0,240) : value;
    }
    return allowed;
  };
  const record = (module, action, details = {}) => {
    const event = { schema:"giongchuan.stem.event.v1", id:randomId(), deviceId:getDeviceId(), module:String(module || "unknown").slice(0,64), action:String(action || "interaction").slice(0,64), details:sanitizeDetails(details), createdAt:new Date().toISOString() };
    const events = readEvents(); events.push(event); writeEvents(events);
    window.dispatchEvent(new CustomEvent("giongchuan:stem-event", { detail:event }));
    return event;
  };
  const complete = (module, score, details = {}) => record(module, "completed", { ...details, score:Math.max(0,Math.min(100,Number(score) || 0)) });
  const exportPacket = (meta = {}) => ({ schema:"giongchuan.stem.packet.v1", exportedAt:new Date().toISOString(), source:"client-side", privacy:"No name, email, phone number or raw code is included.", meta:sanitizeDetails(meta), events:readEvents() });
  const downloadPacket = (meta = {}) => {
    const packet = exportPacket(meta);
    const blob = new Blob([JSON.stringify(packet,null,2)], { type:"application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob); link.download = `giongchuan-stem-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(link.href);
    return packet;
  };
  const importPacket = packet => {
    if (!packet || packet.schema !== "giongchuan.stem.packet.v1" || !Array.isArray(packet.events)) throw new Error("Unsupported STEM packet.");
    const current = readEvents(); const known = new Set(current.map(item => item.id));
    const incoming = packet.events.filter(item => item?.id && !known.has(item.id));
    writeEvents([...current,...incoming]); return incoming.length;
  };
  window.GiongChuanSync = { record, complete, getEvents:readEvents, exportPacket, downloadPacket, importPacket, clear:() => storage.removeItem(STORAGE_KEY), deviceId:getDeviceId() };
  window.addEventListener("storage", event => { if (event.key === STORAGE_KEY) window.dispatchEvent(new CustomEvent("giongchuan:stem-sync", { detail:readEvents() })); });
})();
