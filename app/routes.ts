import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("portal", "routes/portal.tsx"),
  route("marketing-os", "routes/marketing-os.tsx"),
] satisfies RouteConfig;
