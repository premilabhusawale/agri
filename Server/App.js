const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Authentication Routes
const Auth_Route = require('./routes/AuthRoutes');
app.use('/api/v1/auth', Auth_Route);

// User Routes
const User_Route = require('./routes/UserRoutes');
app.use('/api/v1/user', User_Route);

// Product Routes
const Product_Route = require('./routes/ProductRoutes');
app.use('/api/v1/product', Product_Route);

// Cart Routes
const Cart_Route = require('./routes/CartRoutes');
app.use('/api/v1/cart', Cart_Route);

// Rating Routes
const Rating = require('./routes/RatingRoutes');
app.use('/api/rating', Rating);

// Order Routes
const Orders = require('./routes/OrderRoutes');
app.use('/api/v1/orders', Orders);

const WishlistRoute = require('./routes/WishlistRoutes.js')
app.use('/api/agro', WishlistRoute);


const ReviewRoute = require('./routes/ReviewRoutes.js')
app.use('/api/review', ReviewRoute);

// Price / Market Routes
const Price_Route = require('./routes/PriceRoutes');
app.use('/api/v1/prices', Price_Route);
// Payment Routes
const PaymentRoutes = require('./routes/PaymentRoutes');
app.use('/api/payment', PaymentRoutes);

const ChatRoutes = require('./routes/chatRoutes.js');
app.use('/api/agro', ChatRoutes);

const chatbotRoutes = require('./routes/ChatbotRoutes'); 
app.use('/api/chatbot', chatbotRoutes);  


module.exports = app;