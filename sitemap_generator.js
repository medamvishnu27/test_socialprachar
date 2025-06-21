const fs = require('fs');
const path = require('path');

const baseUrl = 'https://socialprachar.com';

const courseSlugs = [
  'full-stack-developer-course',
  'data-science',
  'mern-full-stack-developer-course',
  'python-full-stack-development-course',
  'java-full-stack-development-course',
  'awsdevopscourse',
  'artificial-intelligence-course-training-institute-in-hyderabad',
  'generative-ai-course-training-institute-hyderabad',
  'digital-marketing-course-training-institute-hyderabad',
  'data-analytics-course-training-hyderabad',
  'snowflake-training-in-hyderabad',
  'salesforce-course'
];

const majorPages = [
  '',
  'courses',
  'success-stories',
  'workshop',
  'upcoming-batches',
  'aboutUs',
  'courseBlog',
  'codeclash',
  'scholarship-test'
];

function generateSitemap() {
  let urls = [];

  // Add major pages
  majorPages.forEach(page => {
    urls.push(baseUrl + '/' + page);
  });

  // Add course pages
  courseSlugs.forEach(slug => {
    urls.push(baseUrl + '/' + slug);
  });

  const sitemapEntries = urls.map(url => {
    return (
      '  <url>\n' +
      '    <loc>' + url + '</loc>\n' +
      '    <changefreq>weekly</changefreq>\n' +
      '    <priority>0.8</priority>\n' +
      '  </url>'
    );
  }).join('\n');

  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    sitemapEntries +
    '\n</urlset>';

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap, 'utf8');
  console.log('Sitemap generated at public/sitemap.xml');
}

generateSitemap();
