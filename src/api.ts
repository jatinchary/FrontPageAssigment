import express from 'express';
import { scrapeHackerNews, Story } from './scraper';

export const startAPIServer = (port: number, getLatestStories: () => Story[]) => {
  const app = express();

  app.get('/api/stories', async (req, res) => {
    try {
      const stories = await scrapeHackerNews();
      res.json(stories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      res.status(500).json({ error: 'Failed to fetch stories' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};
