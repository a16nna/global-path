require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { connectRedis } = require('./config/redis');
const { requestId } = require('./middleware/requestId');
const { errorHandler } = require('./middleware/errorHandler');
const { globalRateLimiter } = require('./middleware/rateLimiter');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const roadmapRoutes = require('./routes/roadmap');
const metaRoutes = require('./routes/meta');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(requestId);
app.use(globalRateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/meta', metaRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', requestId: req.requestId });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  await connectRedis();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
