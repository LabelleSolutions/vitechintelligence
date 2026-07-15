import { useMemo, useState } from "react";

const pillars = [
  { name: "Business & Leadership Intelligence", audience: "Founders, managers, operations leaders", offer: "Consulting, leadership development, workforce management" },
  { name: "Communication & Workforce Capability", audience: "Employers, training centers, professionals", offer: "Mastery English, MTI reduction, Business English, workplace communication" },
  { name: "Business Software & Automation", audience: "SMEs and growing businesses", offer: "CRM, ERP, workflow automation, embedded professional logic" },
  { name: "Operational & Workforce Intelligence", audience: "Enterprise, HR, operations and technology teams", offer: "Halibut OS Cloud and Halibut Workforce Intelligence" },
  { name: "Future Workforce & Education", audience: "Schools, students, families and partners", offer: "K12 workforce introduction, Vina Skill Trust, Mastery UpBit and EdTech" },
];

const weeklyPlan = [
  ["Monday", "Authority", "Founder insight: why disconnected business signals slow decisions", "LinkedIn + Facebook"],
  ["Tuesday", "Education", "Carousel: five signs your workflow needs redesign", "Facebook + LinkedIn"],
  ["Wednesday", "Demonstration", "CRM or Halibut operational intelligence demo", "LinkedIn + Reels"],
  ["Thursday", "Proof", "Before-and-after client workflow or learning case", "Facebook + Website"],
  ["Friday", "Lead generation", "Free business intelligence consultation or diagnostic", "Zalo + Facebook"],
  ["Saturday", "Human connection", "Leadership, communication or English workplace story", "Facebook + TikTok"],
  ["Sunday", "Community", "K12, career readiness or future workforce content", "Facebook + Reels"],
];

const copy = {
  en: {
    title: "ViTech Marketing OS",
    subtitle: "Plan, create, publish, capture leads and learn from one coordinated workspace.",
    market: "Vietnam-first public introduction strategy",
    calendar: "Weekly social media calendar",
    generator: "Content & creative maker",
    leads: "Lead capture",
    seo: "SEO workspace",
    generate: "Generate draft",
    download: "Download draft",
    copy: "Copy caption",
    leadButton: "Save lead locally",
  },
  vi: {
    title: "Hệ điều hành Marketing ViTech",
    subtitle: "Lập kế hoạch, sáng tạo, xuất bản, thu hút khách hàng tiềm năng và cải tiến trong một không gian làm việc thống nhất.",
    market: "Chiến lược giới thiệu ưu tiên thị trường Việt Nam",
    calendar: "Lịch nội dung mạng xã hội hàng tuần",
    generator: "Công cụ tạo nội dung và sáng tạo",
    leads: "Thu thập khách hàng tiềm năng",
    seo: "Không gian tối ưu SEO",
    generate: "Tạo bản nháp",
    download: "Tải bản nháp",
    copy: "Sao chép nội dung",
    leadButton: "Lưu khách hàng trên trình duyệt",
  },
};

export default function MarketingOS() {
  const [language, setLanguage] = useState<"en" | "vi">("en");
  const [pillar, setPillar] = useState(pillars[0].name);
  const [channel, setChannel] = useState("LinkedIn");
  const [objective, setObjective] = useState("Generate qualified consultation leads");
  const [draft, setDraft] = useState("");
  const [lead, setLead] = useState({ name: "", company: "", email: "", interest: pillars[0].name });
  const t = copy[language];

  const selected = useMemo(() => pillars.find((item) => item.name === pillar) ?? pillars[0], [pillar]);

  function generateDraft() {
    const opening = language === "vi"
      ? "Doanh nghiệp không thiếu dữ liệu. Điều thường thiếu là khả năng kết nối dữ liệu với quyết định và hành động."
      : "Businesses rarely lack data. What they often lack is a clear connection between signals, decisions and coordinated action.";
    const body = language === "vi"
      ? `Tuần này ViTech tập trung vào ${selected.name}. Chúng tôi hỗ trợ ${selected.audience.toLowerCase()} thông qua ${selected.offer.toLowerCase()}. Mục tiêu: ${objective}.`
      : `This week ViTech is focusing on ${selected.name}. We support ${selected.audience.toLowerCase()} through ${selected.offer.toLowerCase()}. Campaign objective: ${objective}.`;
    const close = language === "vi"
      ? "Đăng ký tư vấn Business Intelligence miễn phí để xác định điểm nghẽn vận hành và hướng triển khai phù hợp."
      : "Book a free Business Intelligence consultation to identify operational friction and the right starting point.";
    setDraft(`${opening}\n\n${body}\n\n${close}\n\n#ViTechIntelligence #OperationalIntelligence #VietnamBusiness #DigitalTransformation`);
  }

  function downloadDraft() {
    const blob = new Blob([draft || "Generate a draft first."], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "vitech-social-draft.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function saveLead(event: React.FormEvent) {
    event.preventDefault();
    const current = JSON.parse(localStorage.getItem("vitech-marketing-leads") || "[]");
    current.push({ ...lead, createdAt: new Date().toISOString(), status: "New" });
    localStorage.setItem("vitech-marketing-leads", JSON.stringify(current));
    setLead({ name: "", company: "", email: "", interest: pillars[0].name });
    alert(language === "vi" ? "Đã lưu khách hàng tiềm năng." : "Lead saved in this browser.");
  }

  const shareText = encodeURIComponent(draft || "ViTech Intelligence");

  return (
    <main style={{ minHeight: "100vh", background: "#061632", color: "#eaf2ff", padding: "24px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center", flexWrap: "wrap", marginBottom: 24 }}>
          <div>
            <div style={{ color: "#73b4ff", fontWeight: 900, letterSpacing: ".12em", fontSize: 12 }}>VITECH INTELLIGENCE</div>
            <h1 style={{ fontSize: "clamp(34px,6vw,64px)", margin: "8px 0" }}>{t.title}</h1>
            <p style={{ color: "#b9cbea", fontSize: 18, maxWidth: 760 }}>{t.subtitle}</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setLanguage("en")} style={buttonStyle(language === "en")}>English</button>
            <button onClick={() => setLanguage("vi")} style={buttonStyle(language === "vi")}>Tiếng Việt</button>
          </div>
        </header>

        <section style={panelStyle}>
          <h2>{t.market}</h2>
          <div style={gridStyle}>
            {pillars.map((item, index) => (
              <article key={item.name} style={{ ...cardStyle, borderColor: index === 3 ? "#dcae54" : "#23416d" }}>
                <span style={{ color: "#78b7ff", fontWeight: 900 }}>0{index + 1}</span>
                <h3>{item.name}</h3>
                <p style={mutedStyle}>{item.audience}</p>
                <p>{item.offer}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={panelStyle}>
          <h2>{t.calendar}</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
              <thead><tr>{["Day", "Role", "Public topic", "Primary channels"].map((x) => <th key={x} style={cellStyle}>{x}</th>)}</tr></thead>
              <tbody>{weeklyPlan.map((row) => <tr key={row[0]}>{row.map((value) => <td key={value} style={cellStyle}>{value}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
          <section style={panelStyle}>
            <h2>{t.generator}</h2>
            <label style={labelStyle}>Solution pillar<select value={pillar} onChange={(e) => setPillar(e.target.value)} style={inputStyle}>{pillars.map((x) => <option key={x.name}>{x.name}</option>)}</select></label>
            <label style={labelStyle}>Channel<select value={channel} onChange={(e) => setChannel(e.target.value)} style={inputStyle}>{["LinkedIn", "Facebook", "Zalo", "TikTok / Reels", "Website"].map((x) => <option key={x}>{x}</option>)}</select></label>
            <label style={labelStyle}>Objective<input value={objective} onChange={(e) => setObjective(e.target.value)} style={inputStyle} /></label>
            <button onClick={generateDraft} style={primaryButton}>{t.generate}</button>
            <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={12} style={{ ...inputStyle, resize: "vertical", marginTop: 14 }} placeholder="Generated caption appears here" />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
              <button onClick={() => navigator.clipboard.writeText(draft)} style={secondaryButton}>{t.copy}</button>
              <button onClick={downloadDraft} style={secondaryButton}>{t.download}</button>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fvitechintelligence.com`} target="_blank" rel="noreferrer" style={linkButton}>LinkedIn</a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fvitechintelligence.com`} target="_blank" rel="noreferrer" style={linkButton}>Facebook</a>
              <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noreferrer" style={linkButton}>WhatsApp</a>
            </div>
            <p style={mutedStyle}>Direct publishing requires official Meta, LinkedIn and Zalo APIs. These links open each platform's supported sharing flow.</p>
          </section>

          <section style={panelStyle}>
            <h2>{t.leads}</h2>
            <form onSubmit={saveLead}>
              <label style={labelStyle}>Name<input required value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} style={inputStyle} /></label>
              <label style={labelStyle}>Company<input value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} style={inputStyle} /></label>
              <label style={labelStyle}>Email<input required type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} style={inputStyle} /></label>
              <label style={labelStyle}>Interest<select value={lead.interest} onChange={(e) => setLead({ ...lead, interest: e.target.value })} style={inputStyle}>{pillars.map((x) => <option key={x.name}>{x.name}</option>)}</select></label>
              <button style={primaryButton}>{t.leadButton}</button>
            </form>
            <hr style={{ borderColor: "#23416d", margin: "24px 0" }} />
            <h2>{t.seo}</h2>
            <p style={mutedStyle}>Recommended Vietnam-first keyword clusters:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["tư vấn quản trị doanh nghiệp", "phần mềm CRM Việt Nam", "ERP cho doanh nghiệp vừa và nhỏ", "đào tạo tiếng Anh doanh nghiệp", "quản trị nhân sự và workforce", "tự động hóa quy trình", "operational intelligence Vietnam"].map((tag) => <span key={tag} style={tagStyle}>{tag}</span>)}
            </div>
            <p style={mutedStyle}>Production phase: localized landing pages, metadata templates, structured data, hreflang, Search Console and campaign attribution.</p>
          </section>
        </div>
      </div>
    </main>
  );
}

const panelStyle: React.CSSProperties = { background: "rgba(10,30,67,.92)", border: "1px solid #23416d", borderRadius: 22, padding: 22, marginBottom: 20, boxShadow: "0 18px 60px rgba(0,0,0,.22)" };
const gridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 14 };
const cardStyle: React.CSSProperties = { background: "#0b214a", border: "1px solid", borderRadius: 18, padding: 18 };
const mutedStyle: React.CSSProperties = { color: "#aabddd", lineHeight: 1.6 };
const cellStyle: React.CSSProperties = { textAlign: "left", borderBottom: "1px solid #23416d", padding: 12, verticalAlign: "top" };
const labelStyle: React.CSSProperties = { display: "grid", gap: 7, fontWeight: 800, marginBottom: 14 };
const inputStyle: React.CSSProperties = { width: "100%", borderRadius: 12, border: "1px solid #315484", background: "#071b3f", color: "#fff", padding: 12, font: "inherit" };
const primaryButton: React.CSSProperties = { border: 0, borderRadius: 12, background: "linear-gradient(135deg,#1769ff,#0b44af)", color: "#fff", padding: "12px 16px", fontWeight: 900, cursor: "pointer" };
const secondaryButton: React.CSSProperties = { ...primaryButton, background: "#17345f", border: "1px solid #315484" };
const linkButton: React.CSSProperties = { ...secondaryButton, textDecoration: "none", display: "inline-flex", alignItems: "center" };
const tagStyle: React.CSSProperties = { background: "#122e5e", border: "1px solid #315484", color: "#cde2ff", borderRadius: 999, padding: "7px 10px", fontSize: 13 };
function buttonStyle(active: boolean): React.CSSProperties { return { ...secondaryButton, background: active ? "#dcae54" : "#17345f", color: active ? "#071b3f" : "#fff" }; }
