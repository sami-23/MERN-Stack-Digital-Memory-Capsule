const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const capsuleRoutes = require('./routes/capsule');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: '20mb'}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/capsule', capsuleRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});