const path = require('path');
const fs = require('fs');
const SitemapGenerator = require('react-router-sitemap-generator');

// Import your React Router configuration
const router = require('./src/App').default;

// Set the base URL of your website
const baseUrl = 'https://socialprachar.com';

// Define the output file path for the sitemap
const output = path.resolve(__dirname, 'public', 'sitemap.xml');

// Create the sitemap
const generator = new SitemapGenerator(baseUrl, router);
generator.save(output);

// Confirm completion
console.log('Sitemap generated successfully at:', output);