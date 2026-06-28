export type Role = "learner" | "school" | "enterprise";

export type LoginContext = {
  plan?: string;
  intent?: string;
  campaign?: string;
  returnTo?: string;
};

const SAFE_TOKEN = /^[a-z0-9][a-z0-9_-]{0,63}$/i;
const MAX_RETURN_TO_LENGTH = 240;

function safeToken(value: string | null): string | undefined {
  if (!value || !SAFE_TOKEN.test(value)) return undefined;
  return value;
}

export function safeInternalPath(value: string | null): string | undefined {
  if (!value || value.length > MAX_RETURN_TO_LENGTH) return undefined;
  if (!value.startsWith("/") || value.startsWith("//")) return undefined;

  try {
    const parsed = new URL(value, "https://giongchuan.local");
    if (parsed.origin !== "https://giongchuan.local") return undefined;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return undefined;
  }
}

export function readLoginContext(params: URLSearchParams): LoginContext {
  const context: LoginContext = {};
  const plan = safeToken(params.get("plan"));
  const intent = safeToken(params.get("intent"));
  const campaign = safeToken(params.get("campaign"));
  const returnTo = safeInternalPath(params.get("returnTo"));

  if (plan) context.plan = plan;
  if (intent) context.intent = intent;
  if (campaign) context.campaign = campaign;
  if (returnTo) context.returnTo = returnTo;
  return context;
}

export function buildPostLoginDestination(role: Role, context: LoginContext): string {
  const params = new URLSearchParams({ role });
  if (context.plan) params.set("plan", context.plan);
  if (context.intent) params.set("intent", context.intent);
  if (context.campaign) params.set("campaign", context.campaign);
  if (context.returnTo) params.set("next", context.returnTo);
  return `/portal?${params.toString()}`;
}
