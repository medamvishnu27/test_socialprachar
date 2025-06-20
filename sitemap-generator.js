const fs = require('fs');

// List of URLs based on your React routes
const urls = [
    '/',
    '/privacy-policy',
    '/scholarship-test',
    '/career-roadmaps',
    '/courses',
    '/aboutUs',
    '/:slug',  // dynamic route
    '/success-stories',
    '/career-counselling',
    '/upcoming-batches',
    '/Quiz',
    '/course/:courseID', // dynamic route
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

// Construct the XML structure for the sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
    <url>
      <loc>https://socialprachar.com${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>`).join('')}
</urlset>`;

// Write the sitemap.xml to the public directory
fs.writeFileSync('./public/sitemap.xml', sitemap);

console.log('Sitemap generated successfully!');
