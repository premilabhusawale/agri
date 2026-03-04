const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Auth Routes
const Auth_Route = require('./routes/AuthRoutes')
app.use('/api/v1', Auth_Route);

// User Routes
const User_Route = require('./routes/UserRoutes')
app.use('/api/v1', User_Route);

// Product Routes
const Product_Route = require('./routes/ProductRoutes')
app.use('/api/v1', Product_Route);

// Cart Routes
const Cart_Route = require('./routes/CartRoutes')
app.use('/api/v1', Cart_Route);

// Order Routes
const Order_Route = require('./routes/OrderRoutes')
app.use('/api/v1', Order_Route);

// Payment Routes
const Payment_Route = require('./routes/PaymentRoutes')
app.use('/api/v1', Payment_Route);

// Chatbot Routes
const Chatbot_Route = require('./routes/ChatbotRoutes')
app.use('/api/v1', Chatbot_Route);

// Chat Routes
const Chat_Route = require('./routes/chatRoutes')
app.use('/api/v1', Chat_Route);

// Rating & Review & Wishlist Routes
const Rating_Route = require('./routes/RatingRoutes')
app.use('/api/v1', Rating_Route);

const Review_Route = require('./routes/ReviewRoutes')
app.use('/api/v1', Review_Route);

const Wishlist_Route = require('./routes/WishlistRoutes')
app.use('/api/v1', Wishlist_Route);

// Price Routes
const Price_Route = require('./routes/PriceRoutes')
app.use('/api/v1', Price_Route);

// Admin Routes
const Admin_Route = require('./routes/AdminRoutes')
app.use('/api/v1', Admin_Route);

module.exports = app;