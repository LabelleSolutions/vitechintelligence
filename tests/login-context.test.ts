import test from "node:test";
import assert from "node:assert/strict";
import { buildPostLoginDestination, readLoginContext, safeInternalPath } from "../app/lib/login-context.ts";

test("preserves plan, intent and campaign through login", () => {
  const context = readLoginContext(new URLSearchParams("plan=builder&intent=orientation&campaign=stem-launch"));
  assert.deepEqual(context, {
    plan: "builder",
    intent: "orientation",
    campaign: "stem-launch",
  });
  assert.equal(
    buildPostLoginDestination("learner", context),
    "/portal?role=learner&plan=builder&intent=orientation&campaign=stem-launch",
  );
});

test("allows a safe internal return path", () => {
  const returnTo = safeInternalPath("/portal?tab=readiness#summary");
  assert.equal(returnTo, "/portal?tab=readiness#summary");
  assert.equal(
    buildPostLoginDestination("school", { returnTo }),
    "/portal?role=school&next=%2Fportal%3Ftab%3Dreadiness%23summary",
  );
});

test("rejects external and protocol-relative return paths", () => {
  assert.equal(safeInternalPath("https://example.com/steal-session"), undefined);
  assert.equal(safeInternalPath("//example.com/steal-session"), undefined);
  assert.equal(safeInternalPath("javascript:alert(1)"), undefined);
});

test("drops malformed marketing tokens", () => {
  const context = readLoginContext(new URLSearchParams("plan=<script>&intent=orientation&campaign=a%20b"));
  assert.deepEqual(context, { intent: "orientation" });
});
