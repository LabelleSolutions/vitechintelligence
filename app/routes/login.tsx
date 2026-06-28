import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/login";
import { Icon } from "../components/Icon";
import { buildPostLoginDestination, readLoginContext, type Role } from "../lib/login-context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Đăng nhập | Giọng Chuẩn Global" },
    { name: "description", content: "Đăng nhập theo vai trò người học, nhà trường hoặc doanh nghiệp." },
  ];
}

const isRole = (value: string | null): value is Role => value === "learner" || value === "school" || value === "enterprise";

export default function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const requestedRole = params.get("role");
  const context = useMemo(() => readLoginContext(params), [params]);
  const [role, setRole] = useState<Role>(isRole(requestedRole) ? requestedRole : "learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const next = params.get("role");
    if (isRole(next)) setRole(next);
  }, [params]);

  const openPortal = (selectedRole: Role, providedEmail?: string) => {
    const profiles = { learner: "Minh Anh", school: "Trường THPT Đối tác", enterprise: "Đối tác Doanh nghiệp" };
    const session = {
      role: selectedRole,
      name: profiles[selectedRole],
      email: providedEmail || `${selectedRole}.demo@giongchuan.vn`,
      authProvider: "demo" as const,
      demo: true,
      context,
      loginAt: new Date().toISOString(),
    };

    try {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("giongchuan-session", JSON.stringify(session));
      localStorage.setItem("giongchuan-last-role", selectedRole);
    } catch {
      setMessage("Trình duyệt đang chặn lưu phiên. Vui lòng cho phép lưu trữ cục bộ để mở bản demo.");
      return;
    }

    navigate(buildPostLoginDestination(selectedRole, context));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Vui lòng nhập email hợp lệ.");
      return;
    }
    if (password.length < 8) {
      setMessage("Mật khẩu cần tối thiểu 8 ký tự.");
      return;
    }
    setMessage("Xác thực bản demo thành công.");
    setTimeout(() => openPortal(role, email), 250);
  };

  const contextLabel = context.plan
    ? `Lộ trình đã chọn: ${context.plan}`
    : context.intent === "orientation"
      ? "Yêu cầu định hướng STEM sẽ được giữ lại sau đăng nhập."
      : null;

  return <main className="login-shell">
    <section className="login-story">
      <div className="login-logos"><Link to="/"><img className="brand-primary" src="/assets/brand-primary.embedded.svg" alt="Giọng Chuẩn Global"/></Link><img className="vitech-white" src="/assets/vitech-logo-white.svg" alt="ViTech Intelligence"/></div>
      <div className="story-content"><span className="secure">Secure role-based access</span><h1>Một cổng vào. Ba trải nghiệm đúng vai trò.</h1><p>Người học nhìn thấy tiến bộ. Nhà trường nhìn thấy đầu ra. Doanh nghiệp nhìn thấy năng lực và rủi ro.</p><div className="story-values"><div className="story-value"><strong>Vietnamese-first</strong><span>Giao diện và báo cáo ưu tiên ngữ cảnh Việt Nam.</span></div><div className="story-value"><strong>Proof-based</strong><span>Kết quả đi kèm tình huống và minh chứng.</span></div><div className="story-value"><strong>Human-aware</strong><span>Chuyển người kiểm tra khi cần phán đoán sâu.</span></div></div></div>
      <div className="login-credit">Giọng Chuẩn Global · Platform intelligence by ViTech</div>
    </section>
    <section className="login-form-area"><div className="login-card">
      <Link className="back-link" to="/">← Quay lại trang chủ</Link><h2>Chào mừng trở lại</h2><p className="intro">Chọn đúng cổng đăng nhập để xem dashboard phù hợp.</p>
      <div className="demo-warning"><strong>Bản demo</strong><span>Chưa kết nối Firebase Auth. Không sử dụng mật khẩu thật tại đây.</span></div>
      {contextLabel && <div className="context-notice">{contextLabel}</div>}
      <div className="role-switch">{(["learner","school","enterprise"] as Role[]).map(item => <button key={item} type="button" className={role === item ? "active" : ""} onClick={() => setRole(item)}>{item === "learner" ? "Người học" : item === "school" ? "Nhà trường" : "Doanh nghiệp"}</button>)}</div>
      <form onSubmit={submit} noValidate>
        {message && <div className={`form-alert show ${message.includes("thành công") ? "success" : "error"}`}>{message}</div>}
        <div className="field"><label htmlFor="email">Email demo</label><div className="input-wrap"><Icon name="mail"/><input id="email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="name@example.com" autoComplete="email" required/></div></div>
        <div className="field"><label htmlFor="password">Mật khẩu demo</label><div className="input-wrap"><Icon name="lock"/><input id="password" type={showPassword ? "text" : "password"} value={password} onChange={event => setPassword(event.target.value)} placeholder="Tối thiểu 8 ký tự" autoComplete="off" required minLength={8}/><button className="toggle-password" type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}><Icon name="eye"/></button></div></div>
        <div className="form-row"><label className="checkbox"><input type="checkbox" checked={remember} onChange={event => setRemember(event.target.checked)}/> Ghi nhớ bản demo trên thiết bị này</label><a href="mailto:support@vitechintelligence.com">Cần hỗ trợ?</a></div>
        <button className="login-submit" type="submit">Mở bản demo →</button>
      </form>
      <div className="divider-text">hoặc mở nhanh theo vai trò</div><div className="demo-grid"><button type="button" onClick={() => openPortal("learner")}>Demo người học</button><button type="button" onClick={() => openPortal("school")}>Demo nhà trường</button><button type="button" onClick={() => openPortal("enterprise")}>Demo doanh nghiệp</button></div>
      <p className="login-note">Production sẽ dùng Firebase Auth hoặc SSO và vai trò được xác minh tại Cloudflare Worker.</p>
    </div></section>
  </main>;
}
