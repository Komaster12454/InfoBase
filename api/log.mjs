import express from 'express';
import fetch from 'node-fetch'; // Use import here
import { Router } from 'express';

const router = Router();

router.post('/log', async (req, res) => {
    const logData = req.body;

    try {
        const webhookResponse = await fetch('https://discord.com/api/webhooks/1303441370706346147/5lY8JGHTS4UYv_rD7Q2zF0JXEifma22uqm9UPdQ1nf_pOBjK8rzX45XAEiouXXOHFXTz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData)
        });

        if (!webhookResponse.ok) {
            const errorText = await webhookResponse.text();
            console.error('Failed to send to Discord webhook:', webhookResponse.status, errorText);
        } else {
            console.log('Log sent to Discord successfully');
        }

        res.status(200).json({ message: 'Logged successfully' });
    } catch (error) {
        console.error('Error sending log to Discord:', error);
        res.status(500).json({ message: 'Failed to log' });
    }
});

export default router;
