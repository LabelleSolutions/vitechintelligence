import type { ReactNode, SVGProps } from "react";

const paths: Record<string, ReactNode> = {
  check: <path d="m5 12 4 4L19 6"/>,
  robot: <><rect x="5" y="7" width="14" height="11" rx="3"/><path d="M9 7V4h6v3M8 12h.01M16 12h.01M9 18v2M15 18v2"/></>,
  ai: <><path d="M9 4h6l1 3 3 1v8l-3 1-1 3H9l-1-3-3-1V8l3-1 1-3Z"/><circle cx="12" cy="12" r="3"/></>,
  chart: <><path d="M4 19V5m0 14h16M7 15l3-4 3 2 4-6"/><circle cx="7" cy="15" r="1"/><circle cx="10" cy="11" r="1"/><circle cx="13" cy="13" r="1"/><circle cx="17" cy="7" r="1"/></>,
  code: <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/>,
  leaf: <><path d="M12 21c5-3 8-7 8-12-5 0-9-2-12-6-4 4-5 9-3 13 1 3 4 5 7 5Z"/><path d="M8 17c2-4 5-7 9-9"/></>,
  mail: <><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
  home: <><path d="M3 11 12 4l9 7v9H3z"/><path d="M9 20v-6h6v6"/></>,
  folder: <path d="M4 5h6l2 2h8v12H4z"/>,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4m8-4v4M4 10h16"/></>,
  message: <><path d="M5 5h14v11H8l-3 3z"/><path d="M8 9h8M8 12h5"/></>,
  logout: <path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10"/>,
};

export function Icon({ name, ...props }: { name: keyof typeof paths } & SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
