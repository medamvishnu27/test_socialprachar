// merged-sitemap-generator.js
const fs = require('fs');
const path = require('path');

// Static URLs (from your hardcoded list)
const staticUrls = [
  '/',
  '/privacy-policy',
  '/scholarship-test',
  '/career-roadmaps',
  '/courses',
  '/aboutUs',
  '/success-stories',
  '/career-counselling',
  '/upcoming-batches',
  '/Quiz',
  '/thank-you',
  '/login',
  '/dashboard',
  '/signup',
  '/profile',
  '/profile/myprofile',
  '/profile/mywork',
  '/profile/enrolled-courses',
  '/profile/enrolled-courses/enrolled',
  '/profile/enrolled-courses/active-courses',
  '/profile/enrolled-courses/completed-courses',
  '/profile/wishlist',
  '/profile/reviews',
  '/profile/quizAttempts',
  '/profile/orderHistory',
  '/profile/question-answer',
  '/profile/settings',
  '/profile/settings/password-settings',
  '/profile/settings/socialProfile-settings',
];

// Filter out placeholder routes (e.g., /:slug, /course/:id)
const filteredStaticUrls = staticUrls.filter(url => !url.includes(':'));

// Extract metadata from App.js
const appJsPath = path.resolve(__dirname, 'src/App.js');
const appJsContent = fs.existsSync(appJsPath) ? fs.readFileSync(appJsPath, 'utf8') : '';

function extractObject(content, objectName) {
  const regex = new RegExp(`const ${objectName} = ({[\\s\\S]*?});`, 'm');
  const match = content.match(regex);
  if (match && match[1]) {
    try {
      const obj = (new Function(`return ${match[1]}`))();
      return obj;
    } catch (e) {
      console.error(`Error parsing ${objectName}:`, e);
      return null;
    }
  }
  return null;
}

const baseUrl = 'https://socialprachar.com';

let courseMetaData = extractObject(appJsContent, 'courseMetaData') || {};
let pageMetaData = extractObject(appJsContent, 'pageMetaData') || {};

// Build dynamic URLs
const courseUrls = Object.keys(courseMetaData).map(slug => `${baseUrl}/${slug}`);
const pageUrls = Object.keys(pageMetaData).map(slug => `${baseUrl}/${slug}`);

// Combine everything and deduplicate
const allUrls = [...new Set([
  ...filteredStaticUrls.map(url => `${baseUrl}${url}`),
  ...courseUrls,
  ...pageUrls,
])];

// Generate final sitemap XML
const generateSitemapXml = (urls) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;
};

// Write sitemap
const sitemapXml = generateSitemapXml(allUrls);
const outputPath = path.resolve(__dirname, 'public/sitemap.xml');
fs.writeFileSync(outputPath, sitemapXml);

console.log('✅ Merged Sitemap generated successfully!');
console.log(`✅ Total URLs: ${allUrls.length}`);
console.log(`📄 Sitemap path: ${outputPath}`); 