import { Link } from "react-router";

export function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <Link className="brand-lockup" to="/" aria-label="Giọng Chuẩn Global trang chủ">
      <img className="primary-logo" src="/assets/brand-primary.embedded.svg" alt="Giọng Chuẩn Global" />
      <span className="divider" aria-hidden="true" />
      <img className="vitech" src={dark ? "/assets/vitech-logo-white.svg" : "/assets/vitech-logo.svg"} alt="ViTech Intelligence" />
    </Link>
  );
}
