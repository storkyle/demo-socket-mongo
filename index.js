import "./_env";
import "./db";
import app from "./server";
import { createServer } from "http";
import { registerSocket } from "./socket";

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

const env = process.env.NODE_ENV || "development";
const port = process.env.NODE_PORT || 3005;

const httpServer = createServer(app);
registerSocket(httpServer);

app.listen({ port }, () => {
  console.log("environment:", env);
  console.log(`The server is running on port ${port}`);
  console.log(`The domain for test http://localhost:${port}`);
});
