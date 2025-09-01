// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Path to the data file
const DATA_FILE = path.join(__dirname, 'counts.json');

// Helper function to read counts from the file
const readCounts = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // If file doesn't exist, return default counts
        if (err.code === 'ENOENT') {
            return { 'hail-mary': 100, 'our-father': 100, 'glory-be': 100 };
        }
        console.error('Failed to read counts file:', err);
        return null;
    }
};

// Helper function to write counts to the file
const writeCounts = (counts) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(counts, null, 2), 'utf8');
    } catch (err) {
        console.error('Failed to write counts file:', err);
    }
};

// GET endpoint to retrieve the current counts
app.get('/api/counts', (req, res) => {
    const counts = readCounts();
    if (counts) {
        res.json(counts);
    } else {
        res.status(500).json({ error: 'Could not retrieve counts.' });
    }
});

// POST endpoint to update the counts
app.post('/api/update-counts', (req, res) => {
    const { hailMary, ourFather, gloryBe } = req.body;
    const currentCounts = readCounts();

    if (!currentCounts) {
        return res.status(500).json({ error: 'Server error: Could not read counts.' });
    }

    // Calculate new counts, ensuring they don't go below zero
    currentCounts['hail-mary'] = Math.max(0, currentCounts['hail-mary'] - (hailMary || 0));
    currentCounts['our-father'] = Math.max(0, currentCounts['our-father'] - (ourFather || 0));
    currentCounts['glory-be'] = Math.max(0, currentCounts['glory-be'] - (gloryBe || 0));

    writeCounts(currentCounts);
    res.json(currentCounts);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});