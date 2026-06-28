import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "manifest", href: "/manifest.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#0a1f49" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Đã có lỗi xảy ra";
  let details = "Vui lòng quay lại trang chủ hoặc thử lại.";

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "Không tìm thấy trang" : "Yêu cầu không thể hoàn tất";
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="section soft" style={{ minHeight: "100vh" }}>
      <div className="container">
        <img src="/assets/vitech-logo.svg" alt="ViTech Intelligence" style={{ width: 180 }} />
        <h1>{title}</h1>
        <p>{details}</p>
        <a className="btn primary" href="/">Về trang chủ</a>
      </div>
    </main>
  );
}
