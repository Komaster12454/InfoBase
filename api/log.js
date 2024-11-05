// api/log.js
import fetch from 'node-fetch';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { ip } = req.body;
        const discordWebhookUrl = 'https://discord.com/api/webhooks/1303414607263826002/8u9YBbZiHiRm1dE2cO_wUFFYe6YFTkkouDgoZt-LIYTwVhtYJa1_AM-qDxXajHpWnnsT'; // Replace with your Discord webhook URL

        const payload = {
            content: `Logged IP: ${ip}`,
        };

        try {
            await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            res.status(200).json({ message: 'IP logged successfully' });
        } catch (error) {
            console.error('Error sending to Discord:', error);
            res.status(500).json({ message: 'Error sending to Discord' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
