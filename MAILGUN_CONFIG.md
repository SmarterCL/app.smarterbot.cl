# Mailgun Configuration Guide

## Overview
This guide explains how to configure Mailgun for sending emails in SmarterBot.cl.

## Environment Variables

Add these to your `.env.local` or Vercel environment:

```bash
# Mailgun Configuration
MAILGUN_API_KEY=key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MAILGUN_API_DOMAIN=smarterbot.store
FROM_EMAIL=noreply@smarterbot.cl
TO_EMAIL=hola@smarterbot.cl
```

## DNS Records for Cloudflare

Add these DNS records to verify your domain and enable email sending:

### 1. SPF Record (TXT)

| Field | Value |
|-------|-------|
| **Type** | `TXT` |
| **Name** | `smarterbot.cl` |
| **Content** | `v=spf1 include:mailgun.org include:_spf.reach.hostinger.com ~all` |

### 2. DKIM Records (CNAME)

**Record 1:**

| Field | Value |
|-------|-------|
| **Type** | `CNAME` |
| **Name** | `pdk1._domainkey.smarterbot.cl` |
| **Content** | `pdk1._domainkey.a3ee63.dkim2.us.mgsend.org` |

**Record 2:**

| Field | Value |
|-------|-------|
| **Type** | `CNAME` |
| **Name** | `pdk2._domainkey.smarterbot.cl` |
| **Content** | `pdk2._domainkey.a3ee63.dkim2.us.mgsend.org` |

### 3. Email Tracking CNAME

| Field | Value |
|-------|-------|
| **Type** | `CNAME` |
| **Name** | `email.smarterbot.cl` |
| **Content** | `mailgun.org` |

## Verification Steps

1. Add all DNS records in Cloudflare
2. Wait 5-10 minutes for DNS propagation
3. Go to Mailgun Dashboard → Domains
4. Click "Verify DNS Settings"
5. Once verified, your API key will work for sending emails

## Testing

Test email sending with:

```bash
curl -s --user 'api:YOUR_MAILGUN_API_KEY' \
  https://api.mailgun.net/v3/smarterbot.store/messages \
  -F from='Excited User <mailgun@smarterbot.store>' \
  -F to='hola@smarterbot.cl' \
  -F subject='Test Email' \
  -F text='Testing Mailgun integration'
```

## Security Notes

- ✅ API key stored in environment variables only
- ✅ Domain verification required for production
- ✅ SPF/DKIM configured for email authenticity
- ❌ Never commit API keys to version control

## Troubleshooting

### "Domain not verified" error
- Ensure all DNS records are added correctly
- Wait for DNS propagation (up to 48 hours)
- Check DNS with: `dig TXT smarterbot.cl`

### "Unauthorized" error
- Verify API key is correct
- Check domain matches your Mailgun account
- Ensure environment variables are loaded

## References

- [Mailgun Documentation](https://documentation.mailgun.com/)
- [Mailgun DNS Setup](https://documentation.mailgun.com/docs/mailgun/user-manual/sending-domains-dns-records/)
- [Cloudflare DNS Management](https://developers.cloudflare.com/dns/)
