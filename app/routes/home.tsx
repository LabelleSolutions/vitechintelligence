import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Brand } from "../components/Brand";
import { Icon } from "../components/Icon";
import { formatVnd, plans } from "../data/pricing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Giọng Chuẩn Global | Interactive STEM by ViTech" },
    { name: "description", content: "Vietnamese-first STEM readiness with interactive physics, calculus and chemistry laboratories." },
  ];
}

const tracks = [
  ["robot", "Robotics", "Thiết kế cảm biến, chuyển động và hệ thống điều khiển."],
  ["ai", "Artificial Intelligence", "Đặt bài toán, đánh giá đầu ra và sử dụng AI có trách nhiệm."],
  ["chart", "Machine Learning", "Khám phá dữ liệu, mẫu hình, độ chính xác và thiên lệch."],
  ["code", "Coding", "Xây tư duy thuật toán, phân rã vấn đề và kiểm thử."],
  ["leaf", "Environmental Science", "Đo lường tác động và thiết kế giải pháp bền vững."],
] as const;

const labs = [
  { title: "Physics Sandbox", label: "Visual Sliders & Live Variables", href: "/physics_sandbox.html", text: "Điều chỉnh lực, khối lượng, vận tốc và góc phóng; quan sát F = ma và quỹ đạo thay đổi ngay.", art: "trajectory" },
  { title: "Calculus Optimizer", label: "Embedded Light-Code Playground", href: "/calculus_sandbox.html", text: "Tìm cực trị của đường cong tải và xác định vị trí cần gia cường bằng mã ngắn có giới hạn an toàn.", art: "curve" },
  { title: "Chemistry VSEPR Core", label: "Molecular Geometry Controller", href: "/chemistry_sandbox.html", text: "Thay bonding pairs và lone pairs để quan sát hình học phân tử thay đổi.", art: "molecule" },
] as const;

function LabArt({ kind }: { kind: string }) {
  if (kind === "trajectory") return <svg viewBox="0 0 240 150"><path d="M20 126h200"/><path className="accent" d="M28 122C74 14 136 28 210 120"/><circle cx="29" cy="121" r="8"/><circle className="orange" cx="210" cy="120" r="10"/></svg>;
  if (kind === "curve") return <svg viewBox="0 0 240 150"><path d="M20 126h200M28 20v112"/><path className="accent" d="M28 116C70 96 82 26 123 28s43 77 91 82"/><circle className="orange" cx="123" cy="28" r="9"/></svg>;
  return <svg viewBox="0 0 240 150"><path d="M120 75L65 38M120 75l55-37M120 75l-45 57M120 75l54 50"/><circle className="center-atom" cx="120" cy="75" r="22"/><circle className="orange" cx="65" cy="38" r="14"/><circle className="orange" cx="175" cy="38" r="14"/><circle className="orange" cx="75" cy="132" r="14"/><circle className="orange" cx="174" cy="125" r="14"/></svg>;
}

export default function Home() {
  return <>
    <header className="site-header">
      <div className="topbar">STEM Career Readiness cho người học Việt Nam — thực hành trước, chứng minh năng lực, chọn nghề có cơ sở.</div>
      <div className="container nav">
        <Brand />
        <nav className="nav-links"><a href="#stem">STEM</a><a href="#interactive-stem">Interactive Lab</a><a href="#readiness">Readiness</a><a href="#pricing">Học phí</a></nav>
        <Link className="btn primary" to="/login">Đăng nhập</Link>
      </div>
    </header>
    <main>
      <section className="hero"><div className="container hero-grid">
        <div><span className="pill">Vietnamese-first • Proof-backed</span><h1>Nói rõ. Nghĩ sâu. <span>Biến kiến thức STEM thành năng lực thật.</span></h1><p className="lead">Giải quyết vấn đề thực tế, xây tư duy phản biện và chuẩn bị cho robotics, AI, machine learning, coding và khoa học môi trường.</p><div className="hero-actions"><a className="btn primary" href="#interactive-stem">Khám phá STEM Lab</a><Link className="btn secondary" to="/login?intent=orientation">Đặt lịch định hướng</Link></div><div className="hero-note"><span className="dot"/>Trải nghiệm → bằng chứng → định hướng → cam kết.</div></div>
        <div className="hero-card"><img src="/assets/upbit-vina.jpg" alt="Người học Việt Nam khám phá năng lực STEM"/></div>
      </div></section>
      <section className="section soft" id="stem"><div className="container"><div className="section-head center"><span className="eyebrow">STEM Learning</span><h2>Năm lộ trình hướng đến năng lực có thể quan sát</h2><p>Mỗi lộ trình kết nối khoa học, công nghệ, kỹ thuật và toán với một sản phẩm hoặc quyết định có thể kiểm thử.</p></div><div className="track-grid">{tracks.map(([icon,name,text])=><article className="track-card" key={name}><div className="track-icon"><Icon name={icon}/></div><h3>{name}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section interactive-stem" id="interactive-stem"><div className="container">
        <div className="section-head center"><span className="eyebrow">The Interactive STEM Architecture</span><h2>Điều khiển, kiểm thử và tự động hóa hệ thống</h2><p>Ba bước biến công thức thành trải nghiệm trực quan và coding thành công cụ giải quyết thực tế.</p></div>
        <div className="stem-architecture"><article><span>STEP 1</span><h3>Active Sandbox Screen</h3><p>Sliders, graphs và canvas phản hồi theo thời gian thực.</p></article><div className="stem-flow-arrow">→</div><article><span>STEP 2</span><h3>Formula Controller</h3><p>Thay biến số để quan sát mô hình toán học thay đổi.</p></article><div className="stem-flow-arrow">→</div><article><span>STEP 3</span><h3>Code Injector</h3><p>Dùng logic ngắn, có giới hạn để tự động hóa hệ thống.</p></article></div>
        <div className="stem-module-grid">{labs.map(lab=><article className="stem-module" key={lab.title}><div className="stem-module-art"><LabArt kind={lab.art}/></div><div className="stem-module-body"><span className="module-label">{lab.title}</span><h3>{lab.label}</h3><p>{lab.text}</p><a className="btn primary" href={lab.href}>Mở phòng thí nghiệm</a></div></article>)}</div>
        <div className="asymmetric-panel"><div><span className="eyebrow">Asymmetric Troubleshooting</span><h3>Một bài toán, hai vai trò, một kết quả chung</h3><p><strong>Calculator — VN:</strong> xử lý công thức và dữ liệu. <strong>Designer — PH:</strong> điều khiển giao diện trực quan. Hai người phải truyền tham số rõ ràng để hoàn thành nhiệm vụ.</p></div><div className="lean-stack"><strong>Lean client-side architecture</strong><span>Mô phỏng chạy trên thiết bị người học</span><span>Backend chỉ nhận completion JSON nhỏ</span><span>Không gửi dữ liệu cá nhân trong evidence packet</span></div></div>
      </div></section>
      <section className="section" id="readiness"><div className="container"><div className="section-head center"><span className="eyebrow">Career Readiness</span><h2>Từ trải nghiệm đến bằng chứng năng lực</h2></div><div className="feature-stack">
        <article className="feature-row"><div className="feature-media"><img src="/assets/career-readiness.jpg" alt="Career readiness model"/></div><div className="feature-copy"><h3>Tiến bộ dễ hiểu cho người học và phụ huynh</h3><p>Theo dõi giao tiếp, phân tích, thiết kế, hợp tác, khả năng thích ứng và chất lượng thực thi.</p></div></article>
        <article className="feature-row"><div className="feature-media"><img src="/assets/infrastructure.embedded.svg" alt="Simulation measurement and action"/></div><div className="feature-copy"><h3>Simulation → Measurement → Action</h3><p>Phát hiện khoảng trống kỹ năng và đề xuất dự án, coaching hoặc lộ trình tiếp theo; quyết định quan trọng vẫn do con người kiểm chứng.</p></div></article>
      </div></div></section>
      <section className="section soft" id="pricing"><div className="container"><div className="section-head center"><span className="eyebrow">Vietnam value pricing</span><h2>Định giá theo chất lượng và bằng chứng đầu ra</h2><p>Không dùng chiến thuật giá quá rẻ. Mức phí bảo vệ chất lượng nội dung, phản hồi và vận hành.</p></div><div className="pricing-grid">{plans.map(plan=><article className={`price-card${plan.featured?" featured":""}`} key={plan.id}><span className="eyebrow">{plan.label}</span><h3>{plan.name}</h3><p>{plan.audience}</p><div className="price">{formatVnd(plan.price)}₫ <small>/ {plan.duration}</small></div><ul>{plan.features.map(feature=><li key={feature}><Icon name="check"/>{feature}</li>)}</ul><Link className={`btn ${plan.featured?"primary":"secondary"}`} to={`/login?plan=${plan.id}`}>Chọn lộ trình</Link></article>)}</div></div></section>
      <section className="section"><div className="container"><div className="cta-panel"><div><h2>Bắt đầu bằng một buổi định hướng, không bắt đầu bằng hợp đồng dài.</h2><p>Thử STEM Lab và hiểu readiness data trước khi cam kết.</p></div><Link className="btn light" to="/login?intent=orientation">Đặt lịch định hướng</Link></div></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-grid"><div><img className="brand-primary" src="/assets/brand-primary.embedded.svg" alt="Giọng Chuẩn Global"/><img className="vitech-white" src="/assets/vitech-logo-white.svg" alt="ViTech Intelligence"/><p>STEM Career Readiness platform by ViTech Intelligence.</p></div><div><h4>Labs</h4><div className="footer-links"><a href="/physics_sandbox.html">Physics</a><a href="/calculus_sandbox.html">Calculus</a><a href="/chemistry_sandbox.html">Chemistry</a></div></div><div><h4>Liên hệ</h4><div className="footer-links"><a href="mailto:hello@vitechintelligence.com">hello@vitechintelligence.com</a><a href="mailto:support@vitechintelligence.com">support@vitechintelligence.com</a></div></div></div><div className="footer-bottom"><span>© 2026 Giọng Chuẩn Global</span><span>Platform intelligence by ViTech</span></div></div></footer>
  </>;
}
