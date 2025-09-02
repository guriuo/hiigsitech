/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://hiigsitech.com', // your domain
  generateRobotsTxt: true,           // this works
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/404'],                 // optional
};
