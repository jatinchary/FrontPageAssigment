import dotenv from 'dotenv';
import { connectDB } from './db/connection';
import { startScheduler } from './utils/scheduler';
import { startAPIServer } from './api';
import { startWebSocketServer } from './ws';

dotenv.config();

const PORT_API = Number(process.env.API_PORT) || 3000;
const PORT_WS = Number(process.env.WS_PORT) || 8080;

(async () => {
  // Establish database connection
  const db = await connectDB();

  // Mock function to get the latest stories
  const getLatestStories = () => [];

  // Start services
  startScheduler('*/5 * * * *'); // Every 5 minute
  startAPIServer(PORT_API, getLatestStories);
  startWebSocketServer(PORT_WS, getLatestStories);
})();
