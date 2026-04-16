import dotenv from 'dotenv';
import app from './app.js';
import db from './models/index.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection established successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();
