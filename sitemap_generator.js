const fs = require('fs');
const path = require('path');

// Assuming your App.js is in src/
const appJsPath = path.resolve(__dirname, 'src/App.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

// A function to extract a JavaScript object from a string
function extractObject(content, objectName) {
  const regex = new RegExp(`const ${objectName} = ({[\\s\\S]*?});`, 'm');
  const match = content.match(regex);
  if (match && match[1]) {
    try {
      // Use eval in a sandboxed way to parse the object.
      // NOTE: Be cautious with eval. Here it's slightly safer as we control the source file.
      const obj = (new Function(`return ${match[1]}`))();
      return obj;
    } catch (e) {
      console.error(`Error parsing ${objectName}:`, e);
      return null;
    }
  }
  return null;
}

const courseMetaData = extractObject(appJsContent, 'courseMetaData');
const pageMetaData = extractObject(appJsContent, 'pageMetaData');

if (!courseMetaData || !pageMetaData) {
  console.error('Could not extract meta data. Sitemap not generated.');
  process.exit(1);
}

const baseUrl = 'https://socialprachar.com';

// Get course URLs from the keys of the courseMetaData object
const courseUrls = Object.keys(courseMetaData).map(slug => `${baseUrl}/${slug}`);

// Get page URLs from the keys of the pageMetaData object
const pageUrls = Object.keys(pageMetaData).map(slug => `${baseUrl}/${slug}`);

// Define other static URLs
const staticUrls = [
  baseUrl + '/',
  baseUrl + '/thank-you',
  baseUrl + '/privacy-policy',
  baseUrl + '/career-roadmaps',
  baseUrl + '/socialhire'
];

// Combine all URLs and remove duplicates
const allUrls = [...new Set([...staticUrls, ...courseUrls, ...pageUrls])];

const generateSitemapXml = (urls) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  urls.forEach(url => {
    xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xml += `
</urlset>`;
  return xml;
};

const sitemapXml = generateSitemapXml(allUrls);

fs.writeFileSync(path.resolve(__dirname, 'public/sitemap.xml'), sitemapXml);

console.log('✅ Sitemap generated successfully!');
console.log(`✅ Found ${allUrls.length} URLs.`);
console.log('✅ Sitemap written to public/sitemap.xml');
