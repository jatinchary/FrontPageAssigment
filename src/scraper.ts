import axios from 'axios';
import * as cheerio from 'cheerio';

export interface Story {
    title: string;
    url: string;
    siteTitle: string;
    siteLink: string;
    points: string;
    time: string;
    timestamp: Date; // Add this line to resolve the error
  }
  

export const scrapeHackerNews = async (): Promise<Story[]> => {
  try {
    const response = await axios.get('https://news.ycombinator.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.data) {
      throw new Error('Empty response data');
    }

    const $ = cheerio.load(response.data);
    
    const stories: Story[] = [];

    const rows = $('#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr');
    
    rows.each((i, elem) => {
      // Skip the last two elements since they contain extra metadata or navigation
      if (i % 3 === 0) {
        const titleElement = $(elem).find('.title > .titleline > a');
        const siteTitleElement = $(elem).find('.title > .titleline > span > a > span');
        const siteLinkElement = $(elem).find('.title > .titleline > span > a');
        const pointsElement = $(rows[i + 1]).find('.subtext > .score');
        const timeElement = $(rows[i + 1]).find('.subtext > .age');

        const data: Story = {
          title: titleElement.text() || 'NULL',
          url: titleElement.attr('href') || 'NULL',
          siteTitle: siteTitleElement.text() || 'NULL',
          siteLink: siteLinkElement.attr('href') || 'NULL',
          points: pointsElement.text().split(" ")[0] || 'NULL',
          time: timeElement.attr('title')?.split(' ')[0] || 'NULL',
          timestamp: new Date()
        };

        stories.push(data);
      }
    });

    return stories;
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return [];
  }
};

// Test the function
scrapeHackerNews().then((stories) => console.log('Scraped Stories:', stories));
