import { scrapeHackerNews } from '../scraper';
import { saveStoriesToDatabase } from '../db/queries';
import { connectDB } from '../db/connection';

export const startScheduler = (interval: string) => {
  const cron = require('node-cron');

  cron.schedule(interval, async () => {
    console.log('Scraping Hacker News...');
    const stories = await scrapeHackerNews();
    const connection = await connectDB();
    await saveStoriesToDatabase(stories, connection);
    console.log('Scraping completed.');
  });
};
