import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/portal";
import { Icon } from "../components/Icon";
import type { LoginContext, Role } from "../lib/login-context";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Command Center | Giọng Chuẩn Global" }];
}

type DemoSession = {
  role: Role;
  name: string;
  email: string;
  authProvider: "demo";
  demo: true;
  context?: LoginContext;
  loginAt: string;
};

const isRole = (value: unknown): value is Role => value === "learner" || value === "school" || value === "enterprise";
const profiles = {
  learner: { name: "Minh Anh", label: "Cổng người học", title: "Learning Command Center" },
  school: { name: "Trường Đối tác", label: "Cổng nhà trường", title: "School Command Center" },
  enterprise: { name: "Đối tác Doanh nghiệp", label: "Cổng doanh nghiệp", title: "Talent Evidence Center" },
};

function readDemoSession(): DemoSession | null {
  try {
    const raw = sessionStorage.getItem("giongchuan-session") || localStorage.getItem("giongchuan-session");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DemoSession>;
    if (!parsed.demo || parsed.authProvider !== "demo" || !isRole(parsed.role)) return null;
    if (typeof parsed.name !== "string" || typeof parsed.email !== "string" || typeof parsed.loginAt !== "string") return null;
    return parsed as DemoSession;
  } catch {
    return null;
  }
}

export default function Portal() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readDemoSession());
    setReady(true);
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("giongchuan-session");
      sessionStorage.removeItem("giongchuan-session");
    } catch {}
    navigate("/login");
  };

  if (!ready) {
    return <main className="portal-gate"><div className="portal-gate-card"><span className="eyebrow">Loading</span><h1>Đang kiểm tra phiên truy cập…</h1></div></main>;
  }

  if (!session) {
    const returnTo = `/portal${params.toString() ? `?${params.toString()}` : ""}`;
    return <main className="portal-gate"><div className="portal-gate-card"><img src="/assets/vitech-logo.svg" alt="ViTech Intelligence"/><span className="eyebrow">Access required</span><h1>Phiên demo không tồn tại hoặc đã hết hạn.</h1><p>Vai trò không còn được lấy trực tiếp từ URL. Hãy chọn cổng truy cập tại màn hình đăng nhập.</p><Link className="btn primary" to={`/login?returnTo=${encodeURIComponent(returnTo)}`}>Đến trang đăng nhập</Link></div></main>;
  }

  const role = session.role;
  const profile = { ...profiles[role], name: session.name };
  const initials = profile.name.split(/\s+/).slice(-2).map(value => value[0]).join("").toUpperCase();
  const contextMessage = session.context?.plan
    ? `Lộ trình đã giữ: ${session.context.plan}`
    : session.context?.intent === "orientation"
      ? "Yêu cầu định hướng STEM đã được giữ lại."
      : null;

  return <div className="portal-shell">
    <aside className="sidebar">
      <Link className="sidebar-logo" to="/"><img src="/assets/brand-primary.embedded.svg" alt="Giọng Chuẩn Global"/></Link>
      <div className="portal-role">{profile.label}</div>
      <nav className="side-nav" aria-label="Điều hướng cổng demo">
        <button className="active"><Icon name="home"/><span>Tổng quan</span></button>
        <button disabled title="Sẽ mở trong bản production"><Icon name="folder"/><span>Lộ trình · Demo</span></button>
        <button disabled title="Sẽ mở trong bản production"><Icon name="chart"/><span>Readiness · Demo</span></button>
        <button disabled title="Sẽ mở trong bản production"><Icon name="calendar"/><span>Hoạt động · Demo</span></button>
      </nav>
      <div className="user-chip"><div className="avatar">{initials}</div><div><strong>{profile.name}</strong><span>{session.email}</span></div><button className="logout" onClick={logout} aria-label="Đăng xuất"><Icon name="logout"/></button></div>
    </aside>
    <main className="portal-main">
      <header className="portal-top"><div className="portal-title"><strong>{profile.title}</strong><span>BẢN DEMO · dữ liệu minh họa, không phải dữ liệu sản xuất</span></div><span className="demo-badge">DEMO</span></header>
      <div className="portal-content">
        {contextMessage && <div className="context-banner"><strong>Tiếp tục hành trình</strong><span>{contextMessage}</span><a href="mailto:sales@vitechintelligence.com?subject=Giọng Chuẩn Global - Tiếp tục đăng ký">Liên hệ để tiếp tục →</a></div>}
        {role === "learner" ? <Learner/> : role === "school" ? <School/> : <Enterprise/>}
      </div>
    </main>
  </div>;
}

function Learner() {
  return <><div className="welcome-panel"><div><h1>Tiếp tục xây bằng chứng STEM</h1><p>Hoàn thành một phòng thí nghiệm và lưu evidence packet vào thiết bị.</p></div><a className="btn light" href="/physics_sandbox.html">Mở Physics Lab</a></div><div className="dashboard-grid"><section className="panel"><h2>Lộ trình hiện tại</h2><div className="path-card"><img src="/assets/career-simulation.jpg" alt="Interactive STEM simulation"/><div><h3>Environmental Data Challenge</h3><p className="muted">Phân tích dữ liệu môi trường và trình bày đề xuất.</p><div className="progress"><span style={{width:"68%"}}/></div><div className="path-meta"><span>68% hoàn thành</span><span>3 nhiệm vụ còn lại</span></div></div></div></section><section className="panel"><h2>Readiness score</h2><div className="score-ring"><div className="score">84%<small>Strong fit</small></div></div><Metric label="Communication" value={88}/><Metric label="Problem solving" value={82}/><Metric label="Adaptability" value={86}/></section></div></>;
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="metric"><span>{label}</span><div className="metric-bar"><span style={{width:`${value}%`}}/></div><b>{value}</b></div>;
}

function School() {
  return <><div className="welcome-panel"><div><h1>School Readiness Command Center</h1><p>Theo dõi đầu ra STEM theo nhóm và ưu tiên hỗ trợ dựa trên bằng chứng.</p></div><button className="btn light" onClick={() => window.print()}>In báo cáo demo</button></div><Kpis values={[["Người học hoạt động","286"],["Readiness trung bình","78%"],["Dự án xác thực","412"],["Nhóm cần hỗ trợ","24"]]}/><EvidenceTable/></>;
}

function Enterprise() {
  return <><div className="welcome-panel"><div><h1>Talent Evidence Center</h1><p>Quan sát năng lực qua challenge, readiness và chất lượng bằng chứng.</p></div><a className="btn light" href="mailto:partnerships@vitechintelligence.com?subject=Giọng Chuẩn Global - Tạo enterprise challenge">Yêu cầu tạo challenge</a></div><Kpis values={[["Hồ sơ trong pipeline","148"],["Strong-fit","46"],["Hoàn thành","92%"],["Risk cần xem","17"]]}/><EvidenceTable/></>;
}

function Kpis({ values }: { values: string[][] }) {
  return <div className="mini-kpis">{values.map(([label,value]) => <div className="kpi" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>;
}

function EvidenceTable() {
  return <section className="panel" style={{marginTop:18}}><h2>Readiness signals</h2><table className="data-table"><thead><tr><th>Module</th><th>Signal</th><th>Next action</th></tr></thead><tbody><tr><td>Physics</td><td>Strong quantitative reasoning</td><td>Team explanation quest</td></tr><tr><td>Calculus</td><td>Needs code confidence</td><td>Light-code practice</td></tr><tr><td>Chemistry</td><td>Strong visual modeling</td><td>Advanced VSEPR mission</td></tr></tbody></table></section>;
}
