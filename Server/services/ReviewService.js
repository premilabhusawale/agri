const Review = require ("../models/Review.js");
const Product = require ("../models/Product.js");
const User = require ("../models/User.js")

const createReview = async (data, user) => {
  const { productId,  description } = data;

  if (!description) throw new Error("Review description is required");

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");


  const review = await Review.create({
    user: user._id,
    product: product._id,
    description,
  });

  product.reviews.push(review._id);
  product.numReviews = product.reviews.length;
  await product.save();

  await User.findByIdAndUpdate(user._id, {
    $push: { reviews: review._id },
  });

  return review.populate("user", "name email");
};

const getAllReviews = async (productId) => {
  const query = { product: productId };

  return Review.find(query)
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

const updateReview = async (reviewId, userId, description) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new Error("Review not found");

  if (review.user.toString() !== userId.toString())
    throw new Error("Unauthorized");

  review.description = description ?? review.description;
  await review.save();

  return review.populate("user", "name email");
};

const deleteReview = async (reviewId, userId) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new Error("Review not found");

  if (review.user.toString() !== userId.toString())
    throw new Error("Unauthorized");

  await Product.findByIdAndUpdate(review.product, {
    $pull: { reviews: review._id },
    $inc: { numReviews: -1 },
  });

  await User.findByIdAndUpdate(userId, {
    $pull: { reviews: review._id },
  });

  await Review.findByIdAndDelete(reviewId);
  return { message: "Review deleted successfully" };
};

module.exports =  {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};