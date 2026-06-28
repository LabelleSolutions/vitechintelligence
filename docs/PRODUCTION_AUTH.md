# Production authentication boundary

The current application intentionally exposes a **demo-only** session. It must not be used to protect learner, school or enterprise records.

## Target flow

1. The browser signs in with Firebase Auth.
2. The browser sends the Firebase ID token to the Cloudflare Worker.
3. The Worker verifies the token signature, issuer, audience and expiry.
4. The Worker resolves the internal user, tenant and role from PostgreSQL.
5. Protected loaders and APIs use the verified server-side principal.
6. The browser never chooses its authoritative role through a URL parameter.

## Required Worker secrets

Configure these with `wrangler secret put`; do not commit them:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `DATABASE_URL`

## Minimum PostgreSQL mapping

```sql
create table app_user (
  id uuid primary key,
  firebase_uid text unique not null,
  email text not null,
  status text not null default 'active'
);

create table tenant_membership (
  user_id uuid not null references app_user(id),
  tenant_id uuid not null,
  role text not null check (role in ('learner', 'school_admin', 'enterprise_admin', 'mentor', 'platform_admin')),
  primary key (user_id, tenant_id, role)
);
```

## Security requirements

- Reject expired, malformed or incorrectly scoped Firebase tokens.
- Never trust `role`, `tenant_id`, `user_id` or assessment scores from browser query parameters.
- Apply tenant filters to every database query.
- Record privileged access in an audit log.
- Add rate limits to authentication and evidence-ingestion endpoints.
- Keep demo data and production data in separate environments.
- Obtain guardian or school consent before storing data for minors.

## Migration sequence

1. Configure a Firebase development project.
2. Implement token verification in the Worker.
3. Add PostgreSQL user and membership tables.
4. Replace the demo login adapter behind an environment-controlled auth interface.
5. Protect `/portal` loaders and all evidence APIs.
6. Remove role switching from production builds.
7. Complete security and privacy testing before onboarding real users.
