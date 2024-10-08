// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.NEWS_API_KEY; // Store your API key in .env

app.use(cors());

app.get('/api/news', async (req, res) => {
    const { query, category } = req.query;
    try {
        let url = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`; // Set a default country
        if (query) {
            url += `&q=${query}`; // Search query
        }
        if (category) {
            url += `&category=${category}`; // Filter by category
        }
        const response = await axios.get(url);
        res.json(response.data.articles.slice(0, 5)); // Return the top 5 articles
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
