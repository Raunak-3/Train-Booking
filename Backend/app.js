const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
// const trains= require('./routes/trains')

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
