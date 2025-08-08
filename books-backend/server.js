import app from "./app.js";
import { db } from "./config/db.js";

const PORT = 3000;

db.sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
