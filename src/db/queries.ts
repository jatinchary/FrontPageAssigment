import { Connection } from 'mysql2/promise';
import { Story } from '../scraper';

export const saveStoriesToDatabase = async (stories: Story[], db: Connection): Promise<void> => {
  const query = 'INSERT INTO stories (title, url, timestamp) VALUES (?, ?, ?)';

  for (const story of stories) {
    await db.execute(query, [story.title, story.url, story.timestamp]);
  }
};
