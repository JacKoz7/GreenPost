const mysql = require('mysql2/promise');
require('dotenv').config();

const maxRetries = 10;
const retryDelay = 5000;

async function testConnection(retry = 0) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'mysql',
      port: parseInt(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'haslo123',
      database: process.env.DB_NAME || 'greenpost',
    });
    await connection.end();
    console.log("✅ MySQL is ready!");
    return true;
  } catch (err) {
    if (retry >= maxRetries) {
      console.error("❌ Failed to connect to MySQL after retries:", err);
      throw err;
    }
    console.log(`⌛ Retrying MySQL connection (${retry + 1}/${maxRetries})...`);
    await new Promise(resolve => setTimeout(resolve, retryDelay));
    return testConnection(retry + 1);
  }
}

module.exports = testConnection;