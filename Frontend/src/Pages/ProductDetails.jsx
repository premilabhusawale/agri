import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Star, ShoppingCart, Zap, Heart, Share2, TrendingUp, Leaf, Award } from 'lucide-react'
import { getProductById } from '../States/Products/Action'
import { addToCart } from '../States/Cart/Action'
import { addToWishlist, removeFromWishlist, getWishlist } from '../States/Wishlist/Action'
import RatingsReviews from '../Components/RatingReview'

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { product, loading, error } = useSelector((state) => state.products);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Check if current product is in wishlist
    const isWishlisted = wishlistItems?.some(
        (item) => item.product?._id === product?._id
    );

    useEffect(() => {
        setIsLoaded(false);
        setSelectedImage(0);
        setQuantity(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch(getProductById(id));
        dispatch(getWishlist());
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, [id, dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-600"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">{error || 'Product Not Found'}</p>
                    <Link to="/MarketPlace" className="text-green-600 hover:text-green-700 font-semibold">
                        ← Back to Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    const images = [product.image, product.image, product.image, product.image];

    const handleAddToCart = () => {
        dispatch(addToCart(product._id));
        alert(`${product.title} added to cart!`);
    };

    const handleWishlist = () => {
        if (isWishlisted) {
            dispatch(removeFromWishlist(product._id));
        } else {
            dispatch(addToWishlist(product._id));
        }
    };

    const handleBuyNow = () => {
        navigate('/CheckOut', {
            state: {
                buyNow: true,
                buyNowItem: {
                    _id: `buynow_${product._id}`,
                    product: {
                        _id: product._id,
                        title: product.title,
                        image: product.image,
                    },
                    quantity,
                    price: product.price,
                    discountedPrice: product.discountedPrice * quantity,
                }
            }
        });
    };

    return (
        <div className={`bg-gradient-to-b from-green-50 to-white min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section - Images */}
                    <div className="lg:w-96 lg:sticky lg:top-4 lg:self-start">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                <Leaf className="w-4 h-4" />
                                100% Fresh
                            </div>
                            <div className="flex gap-3">
                                {/* Heart / Wishlist Button */}
                                <button
                                    onClick={handleWishlist}
                                    className="p-2 hover:bg-white rounded-full transition-colors shadow-sm"
                                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                >
                                    <Heart
                                        className={`w-5 h-5 transition-colors ${
                                            isWishlisted
                                                ? 'fill-red-500 text-red-500'
                                                : 'text-gray-600'
                                        }`}
                                    />
                                </button>
                                <button className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                                    <Share2 className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                            <img src={images[selectedImage]} alt={product.title} className="w-full h-96 object-cover rounded-lg" />
                        </div>

                        <div className="flex gap-3 mb-6">
                            {images.map((img, idx) => (
                                <div key={idx} onClick={() => setSelectedImage(idx)}
                                    className={`bg-white border-2 rounded-lg p-2 cursor-pointer transition-all shadow-sm flex-1 ${selectedImage === idx ? 'border-green-600' : 'border-gray-200 hover:border-gray-400'}`}>
                                    <img src={img} alt="" className="w-full h-16 object-cover rounded" />
                                </div>
                            ))}
                        </div>

                        {/* Quantity Selector */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Quantity</label>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors">−</button>
                                <input type="number" value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-20 h-10 text-center border border-gray-300 rounded-lg font-semibold focus:outline-none focus:border-green-500"
                                    min="1" />
                                <button onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors">+</button>
                            </div>
                            <div className="mt-3 text-sm text-gray-600">
                                Total: <span className="font-bold text-green-600 text-lg">
                                    ₹{(product.discountedPrice * quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button onClick={handleAddToCart}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 hover:scale-105">
                                <ShoppingCart className="w-5 h-5" />
                                ADD TO CART
                            </button>
                            <button onClick={handleBuyNow}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 hover:scale-105">
                                <Zap className="w-5 h-5" />
                                BUY NOW
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Details */}
                    <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-3">
                            <Link to="/" className="hover:text-green-600">Home</Link> ›{' '}
                            <Link to="/MarketPlace" className="hover:text-green-600">Fresh Produce</Link> ›{' '}
                            {product.title}
                        </div>

                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{product.title}</h1>
                        <p className="text-sm text-gray-500 mb-3">by <span className="font-medium text-gray-700">{product.brand}</span> · {product.category}</p>

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                {product.numRatings || 0} <Star className="w-3 h-3 fill-white" />
                            </div>
                            <span className="text-gray-500 text-sm">{product.numReviews || 0} Ratings & Reviews</span>
                            <span className="text-green-600 font-semibold text-sm flex items-center">
                                <Award className="w-4 h-4 mr-1" />Farm Fresh Quality
                            </span>
                        </div>

                        {/* Price */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                            <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                                <span className="text-3xl font-semibold text-green-700">₹{product.discountedPrice?.toFixed(2)}</span>
                                {product.discount > 0 && (
                                    <>
                                        <span className="text-lg text-gray-400 line-through">₹{product.price?.toFixed(2)}</span>
                                        <span className="text-green-600 font-medium text-base bg-green-50 px-2 py-1 rounded">{product.discount}% off</span>
                                    </>
                                )}
                            </div>
                            <div className="text-sm text-gray-500">Free delivery above ₹500</div>
                        </div>

                        {/* Offers */}
                        {product.offers?.length > 0 && (
                            <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-green-600" />Special Offers
                                </h3>
                                <div className="space-y-2">
                                    {product.offers.map((offer, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-sm">
                                            <span className="text-green-600 font-semibold">✓</span>
                                            <span className="text-gray-700">{offer}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Delivery */}
                        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-3">Delivery Information</h3>
                            <div className="flex gap-3 mb-3">
                                <input type="text" placeholder="Enter Delivery Pincode"
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:border-green-500" />
                                <button className="text-white bg-green-600 hover:bg-green-700 font-semibold text-sm px-6 rounded-lg transition-colors">Check</button>
                            </div>
                            <div className="text-sm text-gray-700 space-y-1">
                                <div>✓ <span className="text-green-600 font-semibold">Free Delivery</span> on orders above ₹500</div>
                                <div>✓ Same day delivery available in select areas</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-3">About This Product</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Services */}
                        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-3">Services & Benefits</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                                {[
                                    { icon: '✓', label: '100% Quality Check' },
                                    { icon: '↻', label: 'Easy Returns' },
                                    { icon: '₹', label: 'Cash on Delivery' },
                                    { icon: '🌱', label: 'Farm Certified' },
                                ].map(({ icon, label }) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">{icon}</div>
                                        <span>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Storage Tips */}
                        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <Leaf className="w-5 h-5 text-green-600" />Storage Tips
                            </h3>
                            <p className="text-sm text-gray-700">
                                Store in a cool, dry place or refrigerate to maintain freshness. Wash thoroughly before consumption.
                                Best consumed within 3-5 days of delivery for maximum nutritional benefits.
                            </p>
                        </div>

                        {/* Live Ratings & Reviews */}
                        <RatingsReviews productId={id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;