# WebSocket Server Project

## Overview
This project demonstrates a WebSocket server built using Node.js, TypeScript, and the `ws` library. The server streams recent and updated stories to connected clients in real-time. It fetches the latest stories from a provided function and periodically broadcasts updates to connected clients.

## Features
- Establishes a WebSocket server to handle client connections.
- Sends recent stories to clients upon connection.
- Periodically broadcasts updated stories to connected clients (every 5 mins).
- Handles WebSocket events such as connection, disconnection, and errors.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- TypeScript

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jatinchary/FrontPageAssigment
   cd FrontPageAssigment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Install TypeScript globally (if not already installed):**
   ```bash
   npm install -g typescript
   ```

4. **Build and Run the project:**

    ```bash
   docker-compose build
   ```


    ```bash
  docker-compose up
   ```


## Configuration
You can configure the WebSocket server by modifying the following settings in the code:
- **Port:** Update the `port` parameter when calling `startWebSocketServer()`.



### Testing Tools:
- Use [Postman](https://www.postman.com/) for WebSocket testing.
- Using Postman
Open Postman or any API testing tool.
Create a GET request to the API endpoint:

Edit
URL: http://localhost:3000/api/stories
Method: GET
Send the request.
If the API is working, you will receive a JSON response with the latest stories.

### Verify the Database
- Access the MySQL container:
```bash
docker exec -it mysql bash
USE hacker_news;
SHOW TABLES;
```


## Acknowledgments
- [ws](https://github.com/websockets/ws) library for WebSocket support.
- TypeScript for type safety and scalability.

---
Feel free to contribute to this project by submitting issues and pull requests!

