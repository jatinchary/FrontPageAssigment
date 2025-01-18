import WebSocket, { Server } from "ws";
import { Story } from "./scraper";

interface WSMessage {
  type: "recent" | "update";
  data: Story[];
}

export const startWebSocketServer = (
  port: number,
  getLatestStories: () => Story[]
) => {
  const wss = new Server({ port });

  const logStories = (stories: Story[], context: string) => {
    console.log(`[${context}] Number of stories: ${stories.length}`);
    if (stories.length > 0) {
      console.log(
        `[${context}] First story:`,
        JSON.stringify(stories[0], null, 2)
      );
    } else {
      console.log(`[${context}] No stories available`);
    }
  };

  const validateAndSendData = (
    ws: WebSocket,
    stories: Story[],
    messageType: "recent" | "update"
  ) => {
    try {
      if (!Array.isArray(stories)) {
        console.error(`[ERROR] Stories is not an array: ${typeof stories}`);
        return false;
      }

      logStories(stories, messageType);

      const message: WSMessage = {
        type: messageType,
        data: stories,
      };
      ws.send(JSON.stringify(message), (err?: Error) => {
        if (err) {
          console.error(`[ERROR] Failed to send ${messageType} stories:`, err);
          return false;
        }
        console.log(
          `[SUCCESS] Sent ${messageType} stories: ${stories.length} items`
        );
        return true;
      });
    } catch (error) {
      console.error(`[ERROR] Error in validateAndSendData:`, error);
      return false;
    }
  };

  wss.on("connection", (ws: WebSocket) => {
    console.log("[CONNECTION] New client connected");

    try {
      const recentStories = getLatestStories();

      validateAndSendData(ws, recentStories, "recent");

      const interval = setInterval(() => {
        try {
          console.log("[UPDATE] Fetching new stories...");
          const newStories = getLatestStories();
          validateAndSendData(ws, newStories, "update");
        } catch (error) {
          console.error("[ERROR] Error in update interval:", error);
        }
      }, 30000);

      ws.on("close", () => {
        console.log("[CLOSE] Client disconnected");
        clearInterval(interval);
      });

      ws.on("error", (err: Error) => {
        console.error("[ERROR] WebSocket error:", err);
      });
    } catch (error) {
      console.error("[ERROR] Error in connection handler:", error);
      ws.close();
    }
  });
  wss.on("error", (error: Error) => {
    console.error("[ERROR] WebSocket server error:", error);
  });

  console.log(`[START] WebSocket server running on ws://localhost:${port}`);

  return () => {
    wss.close(() => {
      console.log("[SHUTDOWN] WebSocket server closed");
    });
  };
};
