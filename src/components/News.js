// src/components/News.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css'; // Import the CSS file for styling
import { ThreeDots } from 'react-loader-spinner'; // Import the correct loader component

const News = () => {
    const [headlines, setHeadlines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];

    const fetchHeadlines = async (term = '', category = '') => {
        setLoading(true);
        setError(null);
        try {
            let url = `http://localhost:5000/api/news`;
            if (term) {
                url += `?query=${term}`;
            }
            if (category) {
                url += `&category=${category}`;
            }
            const response = await axios.get(url);
            setHeadlines(response.data);
        } catch (err) {
            setError('Failed to fetch news headlines.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeadlines();
    }, []);

    const handleSearch = () => {
        fetchHeadlines(searchTerm, selectedCategory);
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        fetchHeadlines(searchTerm, category); // Fetch headlines immediately on category selection
    };

    return (
        <div className="news-container">
            <h2 className="news-title">Latest News Headlines</h2>
            <div className="filters">
                <select className="category-select" onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <input
                    className="search-input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for news..."
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            {loading && (
                <div className="loading-container">
                    <ThreeDots color="#007bff" height={50} width={50} />
                </div>
            )}
            {error && <p className="error-message">{error}</p>}
            <ul className="news-list">
                {headlines.map((article, index) => (
                    <li key={index} className="news-item">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
                            <h3>{article.title}</h3>
                            <p className="news-source">
                                Source: {article.source.name} | Published: {new Date(article.publishedAt).toLocaleDateString()}
                            </p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default News;
