import app from "./app.js";
import "dotenv/config";
import pool from "./config/database.js";

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log("database connected");
    connection.release();

    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (err) {
    console.log(`Databse connection failed: ${err}`);
  }
}

startServer();
