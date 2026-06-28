import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/portal";
import { Icon } from "../components/Icon";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Command Center | Giọng Chuẩn Global" }];
}

type Role = "learner" | "school" | "enterprise";
const isRole = (value: string | null): value is Role => value === "learner" || value === "school" || value === "enterprise";
const profiles = {
  learner: { name: "Minh Anh", label: "Cổng người học", title: "Learning Command Center" },
  school: { name: "Trường Đối tác", label: "Cổng nhà trường", title: "School Command Center" },
  enterprise: { name: "Đối tác Doanh nghiệp", label: "Cổng doanh nghiệp", title: "Talent Evidence Center" },
};

export default function Portal() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const initial = params.get("role");
  const [role, setRole] = useState<Role>(isRole(initial) ? initial : "learner");
  const profile = profiles[role];
  const initials = useMemo(() => profile.name.split(/\s+/).slice(-2).map(value => value[0]).join("").toUpperCase(), [profile.name]);
  const logout = () => { try { localStorage.removeItem("giongchuan-session"); sessionStorage.removeItem("giongchuan-session"); } catch {} navigate("/login"); };

  return <div className="portal-shell">
    <aside className="sidebar">
      <Link className="sidebar-logo" to="/"><img src="/assets/brand-primary.embedded.svg" alt="Giọng Chuẩn Global"/></Link>
      <div className="portal-role">{profile.label}</div>
      <nav className="side-nav"><button className="active"><Icon name="home"/><span>Tổng quan</span></button><button><Icon name="folder"/><span>Lộ trình</span></button><button><Icon name="chart"/><span>Readiness</span></button><button><Icon name="calendar"/><span>Hoạt động</span></button></nav>
      <div className="user-chip"><div className="avatar">{initials}</div><div><strong>{profile.name}</strong><span>Demo workspace</span></div><button className="logout" onClick={logout} aria-label="Đăng xuất"><Icon name="logout"/></button></div>
    </aside>
    <main className="portal-main">
      <header className="portal-top"><div className="portal-title"><strong>{profile.title}</strong><span>Dữ liệu minh họa · không phải dữ liệu sản xuất</span></div><div className="role-switch compact">{(["learner","school","enterprise"] as Role[]).map(item => <button key={item} className={role === item ? "active" : ""} onClick={() => setRole(item)}>{item === "learner" ? "Learner" : item === "school" ? "School" : "Enterprise"}</button>)}</div></header>
      <div className="portal-content">{role === "learner" ? <Learner/> : role === "school" ? <School/> : <Enterprise/>}</div>
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
  return <><div className="welcome-panel"><div><h1>School Readiness Command Center</h1><p>Theo dõi đầu ra STEM theo nhóm và ưu tiên hỗ trợ dựa trên bằng chứng.</p></div><button className="btn light">Xuất báo cáo</button></div><Kpis values={[["Người học hoạt động","286"],["Readiness trung bình","78%"],["Dự án xác thực","412"],["Nhóm cần hỗ trợ","24"]]}/><EvidenceTable/></>;
}

function Enterprise() {
  return <><div className="welcome-panel"><div><h1>Talent Evidence Center</h1><p>Quan sát năng lực qua challenge, readiness và chất lượng bằng chứng.</p></div><button className="btn light">Tạo challenge</button></div><Kpis values={[["Hồ sơ trong pipeline","148"],["Strong-fit","46"],["Hoàn thành","92%"],["Risk cần xem","17"]]}/><EvidenceTable/></>;
}

function Kpis({ values }: { values: string[][] }) {
  return <div className="mini-kpis">{values.map(([label,value]) => <div className="kpi" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>;
}

function EvidenceTable() {
  return <section className="panel" style={{marginTop:18}}><h2>Readiness signals</h2><table className="data-table"><thead><tr><th>Module</th><th>Signal</th><th>Next action</th></tr></thead><tbody><tr><td>Physics</td><td>Strong quantitative reasoning</td><td>Team explanation quest</td></tr><tr><td>Calculus</td><td>Needs code confidence</td><td>Light-code practice</td></tr><tr><td>Chemistry</td><td>Strong visual modeling</td><td>Advanced VSEPR mission</td></tr></tbody></table></section>;
}
