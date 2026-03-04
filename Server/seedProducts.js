const mongoose = require("mongoose");
require("dotenv").config();

const productSchema = new mongoose.Schema({
  productSku: { type: String, unique: true, index: true },
  title: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  offers: [{ type: String }],
  tag: { type: String, required: true },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "ratings" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
  numRatings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.models.products || mongoose.model("products", productSchema);

const products = [
  { productSku: "VEG-TOM-001", title: "Fresh Organic Tomatoes", brand: "GreenFarm", category: "vegetables", description: "Juicy, vine-ripened organic tomatoes grown without pesticides. Perfect for salads, curries, and chutneys.", image: "https://i.pinimg.com/736x/93/d1/cd/93d1cda84fd85bc96bc4c4caf0ff926e.jpg", price: 60, discountedPrice: 49, discount: 18, tag: "organic", offers: ["Buy 2 get 1 free", "10% off on orders above ₹200"], numRatings: 124, numReviews: 86 },
  { productSku: "VEG-SPI-002", title: "Baby Spinach Leaves", brand: "NatureCrop", category: "vegetables", description: "Tender baby spinach leaves, freshly harvested. Rich in iron and vitamins. Ready to eat.", image: "https://i.pinimg.com/736x/d1/e4/6c/d1e46cfd2a939994264a617262be7c2d.jpg", price: 45, discountedPrice: 39, discount: 13, tag: "fresh", offers: ["Free delivery on first order"], numRatings: 98, numReviews: 54 },
  { productSku: "FRU-MAN-003", title: "Alphonso Mangoes", brand: "KonkanHarvest", category: "fruits", description: "Premium Alphonso mangoes from Ratnagiri. Sweet, aromatic, and naturally ripened. Limited seasonal stock.", image: "https://i.pinimg.com/736x/88/dc/24/88dc24223fcd0a98d22d9c58a046ec66.jpg", price: 350, discountedPrice: 299, discount: 15, tag: "seasonal", offers: ["Flat 15% off", "GI Tagged Product"], numRatings: 210, numReviews: 178 },
  { productSku: "FRU-BAN-004", title: "Organic Bananas", brand: "SunGrove", category: "fruits", description: "Farm-fresh organic bananas. High in potassium and natural sugars. Great for smoothies and snacking.", image: "https://i.pinimg.com/736x/96/b1/fa/96b1fa5e9d8a43e7ab58c28cb0c8225f.jpg", price: 50, discountedPrice: 42, discount: 16, tag: "organic", offers: ["Buy 3 dozen save ₹30"], numRatings: 88, numReviews: 62 },
  { productSku: "GRN-WHT-005", title: "Whole Wheat Flour (Atta)", brand: "GoldenMill", category: "grains", description: "Stone-ground whole wheat flour from MP wheat varieties. High fiber, no additives. Makes soft rotis.", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600", price: 120, discountedPrice: 99, discount: 18, tag: "staple", offers: ["5kg bag at special price"], numRatings: 156, numReviews: 110 },
  { productSku: "GRN-RIC-006", title: "Basmati Rice (Premium)", brand: "HimalayaGrain", category: "grains", description: "Long-grain aged basmati rice with natural aroma. Perfect for biryani, pulao, and everyday cooking.", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600", price: 280, discountedPrice: 249, discount: 11, tag: "premium", offers: ["Free jute bag with 5kg pack"], numRatings: 192, numReviews: 145 },
  { productSku: "DAI-MLK-007", title: "Fresh Buffalo Milk", brand: "DesiDairy", category: "dairy", description: "Pure buffalo milk sourced from free-range buffaloes. High fat content, great for making paneer and ghee.", image: "https://i.pinimg.com/1200x/04/2b/57/042b57d77f7f36f93812fab14ef99935.jpg", price: 70, discountedPrice: 65, discount: 7, tag: "fresh", offers: ["Daily subscription available", "Morning delivery by 7am"], numRatings: 230, numReviews: 198 },
  { productSku: "DAI-PAN-008", title: "Homemade Paneer", brand: "DesiDairy", category: "dairy", description: "Fresh soft paneer made daily from full-fat milk. No preservatives. Best consumed within 3 days.", image:"https://i.pinimg.com/736x/70/da/4f/70da4feb69351ca0a029b3f6306b4a25.jpg", price: 180, discountedPrice: 160, discount: 11, tag: "fresh", offers: ["500g pack available"], numRatings: 174, numReviews: 132 },
  { productSku: "ORG-HON-009", title: "Raw Forest Honey", brand: "WildBee", category: "organic", description: "Unprocessed, unfiltered raw honey collected from forest beehives. Rich in antioxidants and enzymes.", image: "https://i.pinimg.com/1200x/29/28/e3/2928e39b41250687a5ab6c80d0c19b86.jpg", price: 450, discountedPrice: 399, discount: 11, tag: "organic", offers: ["Tested for purity", "No added sugar"], numRatings: 310, numReviews: 265 },
  { productSku: "ORG-TUR-010", title: "Organic Turmeric Powder", brand: "SpiceRoot", category: "organic", description: "Pure organic turmeric powder from Erode, Tamil Nadu. High curcumin content. No artificial colour.", image: "https://i.pinimg.com/736x/d2/08/40/d208403ee2b1e1118a0ace0e3065c639.jpg", price: 130, discountedPrice: 110, discount: 15, tag: "organic", offers: ["Certified organic", "Lab tested"], numRatings: 145, numReviews: 98 },
  { productSku: "VEG-POT-011", title: "Fresh Potatoes", brand: "FarmDirect", category: "vegetables", description: "Freshly harvested potatoes from Agra farms. Clean, sorted, and ready to cook.", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600", price: 35, discountedPrice: 30, discount: 14, tag: "fresh", offers: ["5kg bag discount"], numRatings: 88, numReviews: 55 },
  { productSku: "FRU-POM-012", title: "Himalayan Pomegranates", brand: "KashmirFresh", category: "fruits", description: "Sweet, ruby-red pomegranates from Kashmir valleys. Packed with antioxidants and natural sweetness.", image: "https://i.pinimg.com/736x/5d/9c/b2/5d9cb23330f43d0cef71a21f16e48f5e.jpg", price: 200, discountedPrice: 170, discount: 15, tag: "premium", offers: ["Seasonal offer", "Direct from Kashmir"], numRatings: 167, numReviews: 120 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { family: 4 });
    console.log("✅ Connected to:", process.env.DB_URI);

    // Drop the entire collection (clears data + indexes) instead of just deleteMany
    await mongoose.connection.dropCollection("products").catch(() => {
      console.log("⚠️  No existing collection to drop, continuing...");
    });
    console.log("🗑️  Dropped products collection");

    const inserted = await Product.insertMany(products);
    console.log(`🌱 Inserted ${inserted.length} products successfully`);

    // Confirm what's actually in the DB now
    const check = await Product.find({}, { title: 1, image: 1, _id: 0 });
    console.log("\n📸 Images in DB:");
    check.forEach(p => console.log(`  ${p.title} → ${p.image}`));

    await mongoose.disconnect();
    console.log("\n✅ Done!");
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

seed();