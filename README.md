# Giọng Chuẩn Global — Interactive STEM Career Readiness

Vietnamese-first STEM learning and career-readiness platform developed with **ViTech Intelligence**.

The product is designed around a simple operating principle:

> Learners should manipulate, test and explain STEM systems before they commit to a long learning or career pathway.

## Product architecture

### 1. Active Sandbox Screen
Learners manipulate sliders, graphs and canvas elements. Abstract science and mathematics become visible system behaviour.

### 2. Formula Controller
Variables update the simulation immediately. Formulas operate as controllers rather than static text.

### 3. Code Injector
Small, constrained logic inputs automate part of the model. Coding is treated as a tool for solving reality, not as an isolated subject.

## Included interactive laboratories

- `/physics_sandbox.html` — projectile trajectory, force, mass, velocity and angle
- `/calculus_sandbox.html` — structural load curve and local-maximum optimisation
- `/chemistry_sandbox.html` — VSEPR molecular geometry and electron-pair rules
- `/app_sync_engine.js` — privacy-conscious client-side evidence log and JSON packet generator

All mathematical rendering and simulation work runs in the browser. The application can later send only a small completion/evidence packet to an API, keeping backend compute and database usage low.

## Asymmetric Troubleshooting Quest

The multiplayer model divides one problem across two roles:

- **Calculator — VN role:** receives formulas, raw data and numerical constraints.
- **Designer — PH role:** controls the visual simulator without seeing the full formula set.

Success depends on accurate mathematics, clear communication and collaborative verification.

## Main application routes

- `/` — premium marketing and product landing page
- `/login` — role-based demo login
- `/portal` — learner, school and enterprise command centres

The demo authentication adapter stores a temporary local session only. Replace it with Firebase Auth or enterprise SSO before production release.

## Pricing position

The public learner packages are positioned around value and verified outcomes rather than low-cost discounting:

- STEM Discovery — 1,490,000 VND / 8 weeks
- STEM Builder — 3,490,000 VND / 16 weeks
- Innovation Career Lab — 6,900,000 VND / 12 months

The current cost assumptions target approximately a 15% contribution margin.

## Technology

- React 19
- React Router 7
- TypeScript
- Cloudflare Workers and Vite
- Tailwind CSS v4
- HTML Canvas and client-side JavaScript for STEM simulations

## Local development

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run typecheck
npm run build
npm run check
```

Deployment:

```bash
npm run deploy
```

## Production boundaries

Before launch, configure:

1. Firebase Auth or SSO and server-side session verification.
2. PostgreSQL tenant and role mappings.
3. A minimal evidence-ingestion API with schema validation and rate limiting.
4. Privacy, consent and retention rules for minors and school cohorts.
5. CI checks for type safety, build output and browser smoke tests.

© 2026 Giọng Chuẩn Global. Platform intelligence by ViTech Intelligence.
