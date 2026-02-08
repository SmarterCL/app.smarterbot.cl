"use server"

/**
 * MessagingService - Centralized service for WhatsApp and SMS communications.
 * Integrates with n8n/Botpress as defined in SmarterOS Retail Spec.
 */

export type MessageProvider = 'whatsapp' | 'sms';

interface SendMessageOptions {
    to: string;
    content: string;
    provider?: MessageProvider;
    templateId?: string;
    vars?: Record<string, string>;
}

export async function sendVerificationCode(phone: string, code: string) {
    return sendSmarterMessage({
        to: phone,
        content: `Tu código de SmarterOS es: ${code}`,
        provider: 'whatsapp', // Default to WhatsApp for better UX
    });
}

export async function sendSmarterMessage(options: SendMessageOptions) {
    const { to, content, provider = 'whatsapp' } = options;

    console.log(`[MessagingService] Sending ${provider} to ${to}: ${content}`);

    // Integration with n8n / Botpress Webhook
    const webhookUrl = process.env.MESSAGING_WEBHOOK_URL;

    if (!webhookUrl) {
        console.warn('[MessagingService] No webhook URL configured. Message logged but not sent.');
        return { success: true, message: 'logged' };
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: to,
                message: content,
                provider,
                timestamp: new Date().toISOString(),
            }),
        });

        if (!response.ok) throw new Error('Failed to send message via webhook');

        return { success: true };
    } catch (error) {
        console.error('[MessagingService] Error sending message:', error);
        return { success: false, error };
    }
}
