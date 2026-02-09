/**
 * Simple In-Memory Rate Limiter for SmarterOS
 * Note: For production with multiple instances, use Redis.
 */

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // 100 requests per window (relaxed for sign-in flows)

export function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const userData = rateLimitMap.get(ip);

    if (!userData || now - userData.lastReset > WINDOW_SIZE) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return true;
    }

    if (userData.count >= MAX_REQUESTS) {
        return false;
    }

    userData.count += 1;
    return true;
}

// Cleanup interval to prevent memory leaks
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [ip, data] of rateLimitMap.entries()) {
            if (now - data.lastReset > WINDOW_SIZE) {
                rateLimitMap.delete(ip);
            }
        }
    }, WINDOW_SIZE);
}
