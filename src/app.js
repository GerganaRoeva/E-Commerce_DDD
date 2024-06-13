import express from "express";
import json from "body-parser";

const app = express();

// Middleware setup
app.use(json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
