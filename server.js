const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// Store unique visitor IPs
const visitors = new Set();

app.get('/ipinfo', async (req, res) => {
  try {
    // Get real visitor IP
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket.remoteAddress;

    // Fetch location info
    const response = await fetch('https://ipwho.is/');
    const data = await response.json();

    // Add IP if new
    if (!visitors.has(ip)) {
      visitors.add(ip);
      console.log('New visitor:', ip);
    }

    res.json({
      ip,
      city: data.city,
      country: data.country,
      totalVisitors: visitors.size
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch visitor info' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
