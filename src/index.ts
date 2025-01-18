import dotenv from 'dotenv';
import { connectDB } from './db/connection';
import { startScheduler } from './utils/scheduler';
import { startAPIServer } from './api';
import { startWebSocketServer } from './ws';

dotenv.config();

const PORT_API = Number(process.env.API_PORT) || 3000;
const PORT_WS = Number(process.env.WS_PORT) || 8080;

(async () => {
  
  const db = await connectDB();
  const getLatestStories = () => [];

  // Start services
  startScheduler('*/5 * * * *'); 
  startAPIServer(PORT_API, getLatestStories);
  startWebSocketServer(PORT_WS, getLatestStories);
})();
