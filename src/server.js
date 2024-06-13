import app from "./app.js";
import { createServer } from "http";
import router from "./api/router.js";

const PORT = process.env.PORT || 3000;

const server = createServer(app);

app.use("/api", router);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
