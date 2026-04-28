import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import dns from "dns";

dns.setServers(["0.0.0.0", "8.8.8.8"]);

connectDB();

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
});
