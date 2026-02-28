/**
 * Environment Variables Validation
 * 
 * Validates that all required environment variables are present at startup.
 * This prevents runtime errors due to missing configuration.
 * 
 * @usage
 *   Import in your entry point: import { validateEnv } from '@/lib/env'
 *   validateEnv()
 */

export interface EnvValidationResult {
  valid: boolean
  missing: string[]
  warnings: string[]
}

/**
 * Required environment variables for production
 */
const REQUIRED_ENV_VARS = {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: 'Supabase project URL',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'Supabase anonymous key (public)',
  SUPABASE_SERVICE_ROLE_KEY: 'Supabase service role key (private)',
  
  // Clerk Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'Clerk publishable key (public)',
  CLERK_SECRET_KEY: 'Clerk secret key (private)',
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: 'Clerk sign-in URL',
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: 'Clerk sign-up URL',
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: 'Clerk post sign-in redirect',
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: 'Clerk post sign-up redirect',
  
  // Database & JWT
  DATABASE_URL: 'Database connection URL',
  JWT_SECRET_KEY: 'JWT signing secret',
} as const

/**
 * Optional but recommended environment variables
 */
const OPTIONAL_ENV_VARS = {
  // Mailgun
  MAILGUN_API_KEY: 'Mailgun API key for email sending',
  MAILGUN_API_DOMAIN: 'Mailgun domain',
  FROM_EMAIL: 'Default sender email',
  TO_EMAIL: 'Default recipient email',
  
  // Flow (Payments)
  FLOW_API_KEY: 'Flow.cl API key',
  FLOW_SECRET_KEY: 'Flow.cl secret key',
  
  // Integrations
  CHATWOOT_BASE_URL: 'Chatwoot base URL',
  CHATWOOT_ACCOUNT_ID: 'Chatwoot account ID',
  CHATWOOT_ACCESS_TOKEN: 'Chatwoot access token',
  
  // Google AI / Gemini
  GOOGLE_AI_API_KEY: 'Google AI API key',
  GOOGLE_AI_MODEL: 'Google AI model',
  
  // N8N Automation
  N8N_API_KEY: 'N8N API key',
  N8N_BOOTSTRAP_WEBHOOK_URL: 'N8N bootstrap webhook URL',
  
  // SmarterOS API
  SMARTEROS_API_URL: 'SmarterOS API URL',
  SMARTEROS_API_KEY: 'SmarterOS API key',
  
  // Azure Integration
  VAULT_ADDR: 'HashiCorp Vault address',
  VAULT_TOKEN: 'HashiCorp Vault token',
  
  // Metabase
  MB_SITE_URL: 'Metabase site URL',
  MB_EMBEDDING_SECRET_KEY: 'Metabase embedding secret',
  
  // SmarterMCP
  SMARTERMCP_ACCESS_TOKEN: 'SmarterMCP access token',
  SMARTERMCP_SERVER_URL: 'SmarterMCP server URL',
} as const

/**
 * Validate environment variables
 * 
 * @param options - Validation options
 * @param options.strict - If true, throws error on missing required vars (default: true in production)
 * @returns Validation result
 */
export function validateEnv(options: { strict?: boolean } = {}): EnvValidationResult {
  const { strict = process.env.NODE_ENV === 'production' } = options
  const missing: string[] = []
  const warnings: string[] = []

  // Check required variables
  for (const [key, description] of Object.entries(REQUIRED_ENV_VARS)) {
    const value = process.env[key]
    if (!value || value.length < 3) {
      missing.push(key)
    }
  }

  // Check optional but recommended variables
  for (const [key, description] of Object.entries(OPTIONAL_ENV_VARS)) {
    const value = process.env[key]
    if (!value || value.length < 3) {
      warnings.push(`${key} - ${description}`)
    }
  }

  // Validate NEXT_PUBLIC_ variables are safe (not containing secrets)
  const publicVars = Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_'))
  const sensitivePatterns = ['SECRET', 'KEY', 'PASSWORD', 'TOKEN']
  
  for (const publicVar of publicVars) {
    const isSensitive = sensitivePatterns.some(pattern => 
      publicVar.toUpperCase().includes(pattern)
    )
    // Note: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and NEXT_PUBLIC_SUPABASE_ANON_KEY are expected
    const allowedSensitive = [
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    ]
    
    if (isSensitive && !allowedSensitive.includes(publicVar)) {
      console.warn(
        `⚠️  WARNING: ${publicVar} appears to contain sensitive data. ` +
        `Variables prefixed with NEXT_PUBLIC_ are exposed to the browser.`
      )
    }
  }

  // Report results
  if (missing.length > 0) {
    const errorMsg = [
      '❌ Missing required environment variables:',
      ...missing.map(key => `   - ${key}`),
      '',
      'Please check your .env.local file or Vercel environment settings.',
      `Copy .env.example to .env.local and fill in the values.`,
    ].join('\n')

    if (strict) {
      throw new Error(errorMsg)
    } else {
      console.warn(errorMsg)
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  }
}

/**
 * Auto-validate in production on import
 */
if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
  try {
    validateEnv({ strict: true })
  } catch (error) {
    // Re-throw to fail fast in production
    throw error
  }
}
