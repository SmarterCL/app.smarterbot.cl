# Supabase Configuration for SmarterOS

## Environment Variables

> [!CAUTION]
> **NEVER** commit your real API keys or passwords to version control. Use a `.env` file or a secrets manager.

```bash
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-private-key

# Database Connection
# Use strong, unique passwords for production
SUPABASE_DB_HOST=your-project-id.supabase.co
SUPABASE_DB_PORT=5432
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres.your-project-id
SUPABASE_DB_PASSWORD=your-super-strong-password
```

## Database Schema Setup

```sql
-- Apply this schema to your Supabase database
-- File: database/2026_02_08_service_model.sql (Already applied in project)

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_service_status ENABLE ROW LEVEL SECURITY;

-- ... (Detailed policies are in the SQL migration files)
```

## Supabase Authentication Configuration

### OAuth Providers
- Google (with PKCE)
- GitHub
- Custom providers as needed

### Email Templates
Custom email templates for:
- Password reset
- Email confirmation
- Magic link emails

## Application Integration

### Frontend (Next.js)
```javascript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Backup and Recovery

### Export Data
```bash
# Using Supabase CLI
supabase db dump --db-url "postgresql://..." --file backup.sql

# Or using pg_dump directly
pg_dump -h [PROJECT_REF].supabase.co -p 5432 -U "postgres.[PROJECT_REF]" -d postgres -Fc > backup.dump
```

### Restore Data
```bash
# Using Supabase CLI
supabase db reset
supabase db push

# Or using pg_restore
pg_restore -h [PROJECT_REF].supabase.co -p 5432 -U "postgres.[PROJECT_REF]" -d postgres backup.dump
```

## Security Best Practices

1. **Row Level Security (RLS)**: Enabled on all tables
2. **Service Role Key**: Used only in server-side code
3. **Anon Key**: Used only in client-side code
4. **JWT Expiration**: Configured appropriately
5. **Email Confirmation**: Required for account creation

## Monitoring

- Database connection limits
- Query performance
- Storage usage
- Authentication metrics

## Multi-Tenancy Implementation

The Supabase configuration supports multi-tenancy through:
- User-specific service mapping in `user_services`
- RLS policies to isolate user and tenant data
- Shared database with proper indexing on `user_id`
