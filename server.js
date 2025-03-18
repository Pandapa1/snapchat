const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (your HTML file)
app.use(express.static(path.join(__dirname)));

// Endpoint to handle saving data
app.post('/saveData', (req, res) => {
    const data = req.body;

    // Extract IP and location data
    const ip = data.ip || 'Unknown IP';
    const city = data.city || 'Unknown City';
    const region = data.region || 'Unknown Region';
    const country = data.country || 'Unknown Country';
    const loc = data.loc || 'Unknown Location';

    // Format the location data
    const locationData = `IP: ${ip}, City: ${city}, Region: ${region}, Country: ${country}, Coordinates: ${loc}\n`;

    // Append location data to loc.txt
    fs.appendFile('loc.txt', locationData, (err) => {
        if (err) {
            console.error('Error writing to loc.txt:', err);
            return res.status(500).json({ message: 'Error writing to loc.txt' });
        }
        console.log('Location data saved to loc.txt:', locationData);
    });

    // Append all data to file.txt (original functionality)
    fs.appendFile('file.txt', JSON.stringify(data) + '\n', (err) => {
        if (err) {
            console.error('Error writing to file.txt:', err);
            return res.status(500).json({ message: 'Error writing to file.txt' });
        }
        res.json({ message: 'Data saved successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
