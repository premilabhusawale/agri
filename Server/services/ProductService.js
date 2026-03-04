const Product = require("../models/Product.js");
const { generateProductSku, generateSkuCode } = require("../utils/generateSku.js");

/* ---------- CREATE PRODUCT ---------- */
const createProduct = async (reqData, files) => {
  const file = files?.[0];
  if (!file?.path) throw new Error("Product image required");

  const productSku = generateProductSku(reqData.title, reqData.brand);
  const price = Number(reqData.price);
  const discountedPrice = Number(reqData.discountedPrice) ?? price;
  const discount = reqData.discount ?? Math.round(((price - discountedPrice) / price) * 100);

  const product = new Product({
    productSku,
    title: reqData.title,
    brand: reqData.brand,
    category: reqData.category,
    description: reqData.description,
    image: file.path,
    price,
    discountedPrice,
    discount,
    tag: reqData.tag,
    quantity: Number(reqData.quantity) || 0,
    offers: reqData.offers ? JSON.parse(reqData.offers) : [],
  });

  return await product.save();
};

/* ---------- GET ALL PRODUCTS ---------- */
const getAllProducts = async () => {
  return await Product.find().populate("ratings").populate("reviews");
};

/* ---------- FIND PRODUCT BY ID ---------- */
const findProductById = async (id) => {
  const product = await Product.findById(id).populate("ratings").populate("reviews");
  if (!product) throw new Error("Product not found");
  return product;
};

/* ---------- DELETE PRODUCT ---------- */
const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");
  await Product.findByIdAndDelete(id);
  return { message: "Product deleted successfully" };
};

/* ---------- RELATED PRODUCTS ---------- */
const getRelatedProducts = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  return await Product.find({
    _id: { $ne: id },
    category: product.category,
    brand: product.brand,
  }).limit(8);
};

/* ---------- UPDATE PRODUCT ---------- */
const updateProduct = async (productId, reqData, files) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  if (files?.[0]?.path) product.image = files[0].path;

  product.title = reqData.title ?? product.title;
  product.brand = reqData.brand ?? product.brand;
  product.tag = reqData.tag ?? product.tag;
  product.quantity = reqData.quantity ?? product.quantity;
  product.category = reqData.category ?? product.category;
  product.description = reqData.description ?? product.description;
  product.price = reqData.price ?? product.price;
  product.discountedPrice = reqData.discountedPrice ?? product.discountedPrice;
  product.discount = reqData.discount ?? product.discount;

  if (reqData.offers) product.offers = JSON.parse(reqData.offers);

  if (reqData.skus) {
    const skus = JSON.parse(reqData.skus);
    product.skus = skus.map((s) => {
      const discountedPrice = s.discountedPrice ?? s.price;
      const discount = s.discount ?? Math.round(((s.price - discountedPrice) / s.price) * 100);
      return { ...s, skuCode: generateSkuCode(product.productSku, s.weight), discountedPrice, discount };
    });
  }

  return await product.save();
};

/* ---------- HOT DEALS ---------- */
const getHotDeals = async (limit = 10) => {
  return await Product.find({ discount: { $gt: 0 } })
    .sort({ discount: -1 })
    .limit(Number(limit))
    .select("title brand category image price discountedPrice discount skus");
};

/* ---------- GET PRODUCTS BY CATEGORY ---------- */
const getProductsByCategory = async (category) => {
  return await Product.find({ category }).populate("ratings").populate("reviews");
};

/* ---------- FILTER PRODUCTS ✅ ---------- */
const filterProducts = async (query) => {
  const { category, minPrice, maxPrice, rating, tag, brand } = query;

  const filter = {};

  if (category) filter.category = category;
  if (brand) filter.brand = brand;
  if (tag) filter.tag = tag;

  if (minPrice || maxPrice) {
    filter.discountedPrice = {};
    if (minPrice) filter.discountedPrice.$gte = Number(minPrice);
    if (maxPrice) filter.discountedPrice.$lte = Number(maxPrice);
  }

  if (rating) filter.numRatings = { $gte: Number(rating) };

  return await Product.find(filter)
    .populate("ratings")
    .populate("reviews")
    .sort({ createdAt: -1 });
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  deleteProduct,
  getRelatedProducts,
  getHotDeals,
  getProductsByCategory,
  filterProducts, // ✅
};
