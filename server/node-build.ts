import path from "path";
import { createServer } from "./index";
import * as express from "express";
import serverless from "serverless-http";

const app = createServer();
// const port = process.env.PORT;

const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");

app.use(express.static(distPath));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

export const handler = serverless(app);
