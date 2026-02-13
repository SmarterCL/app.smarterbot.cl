const Mailgun = require('mailgun.js');
const formData = require('form-data');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY || '',
    });

    try {
        const response = await mg.messages.create('rut.smarterbot.store', {
            from: 'SmarterBOT <noreply@rut.smarterbot.store>',
            to: Array.isArray(to) ? to : [to],
            subject,
            text,
            html,
        });

        return res.status(200).json({ success: true, messageId: response.id });
    } catch (error) {
        console.error('Mailgun Error:', error);
        return res.status(500).json({ error: 'Error sending email', details: error.message });
    }
}
