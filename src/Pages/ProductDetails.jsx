import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../Data/Products'
import { Star, ShoppingCart, Zap, Heart, Share2, TrendingUp, Leaf, Award } from 'lucide-react'

const ProductDetails = () => {
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    const product = products.find((item) => item.id === Number(id));

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
                <p className="text-xl text-gray-600">Product Not Found</p>
            </div>
        );
    }

    const discountedPrice = product.discount > 0 
        ? product.price * (1 - product.discount / 100) 
        : product.price;

    // Additional product images (using same image for demo)
    const images = [product.image, product.image, product.image, product.image];

    // Default values with fallbacks
    const rating = product.rating || 4.0;
    const reviews = product.reviews || 0;
    
    // Default rating breakdown
    const ratingBreakdown = product.ratingBreakdown || {
        5: Math.floor(reviews * 0.5) || 250,
        4: Math.floor(reviews * 0.3) || 150,
        3: Math.floor(reviews * 0.12) || 60,
        2: Math.floor(reviews * 0.05) || 25,
        1: Math.floor(reviews * 0.03) || 15
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star
                    key={i}
                    className={`w-3 h-3 ${i < fullStars ? 'text-white fill-white' : 'text-gray-300 fill-gray-300'}`}
                />
            );
        }
        return stars;
    };

    return (
        <div className={`bg-gradient-to-b from-green-50 to-white min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section - Images */}
                    <div className="lg:w-96 lg:sticky lg:top-4 lg:self-start">
                        {/* Fresh Badge and Actions */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                <Leaf className="w-4 h-4" />
                                100% Fresh
                            </div>
                            <div className="flex gap-3">
                                <button className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                                    <Heart className="w-5 h-5 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                                    <Share2 className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                            <img 
                                src={images[selectedImage]} 
                                alt={product.name}
                                className="w-full h-96 object-contain"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex gap-3 mb-6">
                            {images.map((img, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`bg-white border-2 rounded-lg p-2 cursor-pointer transition-all shadow-sm ${
                                        selectedImage === idx ? 'border-green-600' : 'border-gray-200 hover:border-gray-400'
                                    }`}
                                >
                                    <img src={img} alt="" className="w-16 h-16 object-contain" />
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 hover:scale-105">
                                <ShoppingCart className="w-5 h-5" />
                                ADD TO CART
                            </button>
                            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 hover:scale-105">
                                <Zap className="w-5 h-5" />
                                BUY NOW
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Details */}
                    <div className="flex-1">
                        {/* Breadcrumb */}
                        <div className="text-xs text-gray-500 mb-3">
                            <Link to="/" className="hover:text-green-600">Home</Link> › Fresh Produce › {product.name}
                        </div>

                        {/* Product Name */}
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h1>

                        {/* Rating Badge */}
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                {rating}
                                <Star className="w-3 h-3 fill-white" />
                            </div>
                            <span className="text-gray-500 text-sm">
                                {reviews > 0 ? reviews.toLocaleString() : '500'} Ratings & {reviews > 0 ? Math.floor(reviews * 0.3) : '150'} Reviews
                            </span>
                            <span className="text-green-600 font-semibold text-sm flex items-center">
                                <Award className="w-4 h-4 mr-1" />
                                Farm Fresh Quality
                            </span>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                            {/* Price Section */}
                          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                                <span className="text-3xl font-semibold text-green-700">
                                    ₹{discountedPrice.toFixed(2)}
                                </span>
                                {product.discount > 0 && (
                                    <>
                                        <span className="text-lg text-gray-400 line-through">
                                            ₹{product.price.toFixed(2)}
                                        </span>
                                        <span className="text-green-600 font-medium text-base bg-green-50 px-2 py-1 rounded">
                                            {product.discount}% off
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="text-sm text-gray-500">
                                Per kg/unit • Free delivery above ₹500
                            </div>
                        </div>

                        {/* Available Offers */}
                        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                                Special Offers
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2 text-sm">
                                    <span className="text-green-600 font-semibold whitespace-nowrap">✓ Fresh Deal</span>
                                    <span className="text-gray-700">Buy 2 kg or more, get extra 5% off</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <span className="text-green-600 font-semibold whitespace-nowrap">✓ Bank Offer</span>
                                    <span className="text-gray-700">10% instant discount on HDFC Bank Cards</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <span className="text-green-600 font-semibold whitespace-nowrap">✓ Wallet Offer</span>
                                    <span className="text-gray-700">Get ₹50 cashback on Paytm/PhonePe payments above ₹300</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <span className="text-green-600 font-semibold whitespace-nowrap">✓ Combo Deal</span>
                                    <span className="text-gray-700">Buy with other vegetables and save up to 15%</span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Options */}
                        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-3">Delivery Information</h3>
                            <div className="flex gap-3 mb-3">
                                <input 
                                    type="text" 
                                    placeholder="Enter Delivery Pincode"
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:border-green-500"
                                />
                                <button className="text-white bg-green-600 hover:bg-green-700 font-semibold text-sm px-6 rounded-lg transition-colors">Check</button>
                            </div>
                            <div className="text-sm text-gray-700 space-y-1">
                                <div>🚚 Delivery by <span className="font-semibold text-green-700">Tomorrow, 11 Jan</span></div>
                                <div>✓ <span className="text-green-600 font-semibold">Free Delivery</span> on orders above ₹500</div>
                                <div>✓ Same day delivery available in select areas</div>
                            </div>
                        </div>

                        {/* Product Highlights */}
                        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-3">Product Highlights</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span>Farm fresh, hand-picked produce</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span>100% organic and pesticide-free</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span>Rich in vitamins, minerals and nutrients</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span>Sourced directly from verified farmers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span>Shelf life: 3-5 days when refrigerated</span>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-3">Services & Benefits</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                                    <span>100% Quality Check</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">↻</div>
                                    <span>Easy Returns</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">₹</div>
                                    <span>Cash on Delivery</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">🌱</div>
                                    <span>Farm Certified</span>
                                </div>
                            </div>
                        </div>

                        {/* Storage Tips */}
                        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <Leaf className="w-5 h-5 text-green-600" />
                                Storage Tips
                            </h3>
                            <p className="text-sm text-gray-700">
                                Store in a cool, dry place or refrigerate to maintain freshness. Wash thoroughly before consumption. 
                                Best consumed within 3-5 days of delivery for maximum nutritional benefits.
                            </p>
                        </div>

                        {/* Product Description */}
                        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-3">About This Product</h3>
                            <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                Fresh, high-quality {product.name.toLowerCase()} sourced directly from trusted farms. 
                                Each piece is carefully hand-picked to ensure you receive only the best produce. 
                                Rich in essential nutrients and vitamins, perfect for maintaining a healthy lifestyle.
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Our produce undergoes strict quality checks and is delivered fresh to your doorstep. 
                                We work directly with farmers to ensure sustainable farming practices and fair prices.
                            </p>
                        </div>

                        {/* Nutritional Information */}
                        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-3">Nutritional Information</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex justify-between text-sm border-b pb-2">
                                    <span className="text-gray-600">Calories</span>
                                    <span className="text-gray-800 font-medium">25-50 per 100g</span>
                                </div>
                                <div className="flex justify-between text-sm border-b pb-2">
                                    <span className="text-gray-600">Protein</span>
                                    <span className="text-gray-800 font-medium">1-3g per 100g</span>
                                </div>
                                <div className="flex justify-between text-sm border-b pb-2">
                                    <span className="text-gray-600">Fiber</span>
                                    <span className="text-gray-800 font-medium">2-4g per 100g</span>
                                </div>
                                <div className="flex justify-between text-sm border-b pb-2">
                                    <span className="text-gray-600">Vitamins</span>
                                    <span className="text-gray-800 font-medium">A, C, K</span>
                                </div>
                            </div>
                        </div>

                        {/* Ratings & Reviews */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-4">Customer Ratings & Reviews</h3>
                            <div className="flex flex-col md:flex-row gap-8 mb-6">
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-green-600">{rating}</div>
                                    <div className="flex justify-center my-2 gap-1">
                                        {renderStars(rating).map((star, idx) => (
                                            <div key={idx} className="bg-green-600 rounded-full p-1">
                                                {star}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {reviews > 0 ? reviews.toLocaleString() : '500'} Ratings
                                    </div>
                                </div>
                                <div className="flex-1">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className="flex items-center gap-2 mb-2">
                                            <span className="text-sm text-gray-600 w-8 font-medium">{stars} ★</span>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                                                <div 
                                                    className="bg-green-600 h-2.5 rounded-full transition-all"
                                                    style={{ 
                                                        width: `${(ratingBreakdown[stars] / (reviews || 500)) * 100}%` 
                                                    }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-500 w-16 text-right">
                                                {ratingBreakdown[stars]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails