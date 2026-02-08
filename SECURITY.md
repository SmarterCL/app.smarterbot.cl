# Security Policy

## Supported Versions

Use the following versions to ensure security updates and stability:

| Component | Version |
| :--- | :--- |
| Node.js | v24.x |
| Next.js | v16.x |
| React | v19.x |

## Best Practices

1.  **Never commit API Keys**: Ensure all secrets are stored in `.env.local` or environment variables, which are ignored by git.
2.  **Environment Variables**:
    *   `NEXT_PUBLIC_` prefix exposes variables to the browser. Only use this for non-sensitive public keys (e.g., Clerk Publishable Key, Supabase Anon Key).
    *   Secret keys (e.g., Clerk Secret Key, Supabase Service Role) must NOT have this prefix and must only be used on the server.
3.  **Dependency Management**: Run `pnpm audit` regularly to check for vulnerable dependencies.
4.  **Proxy Protection**: Ensure `proxy.ts` correctly protects private routes using Clerk or your auth provider.

## Reporting a Vulnerability

If you discover a security vulnerability, please report it to the development team immediately via private channels. Do not open public issues for security exploits.
