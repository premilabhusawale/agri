import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../Data/Products'
import { Star, Home, ChevronRight } from 'lucide-react'

const ProductDetails = () => {
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    const product = products.find((item) => item.id === Number(id));
    if (!product) {
        return <p>Product Not Found</p>
    }

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const discountedPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;

    // Dummy fields
    const description = "This is a high-quality product designed for gardening enthusiasts. It provides excellent performance and durability for all your gardening needs.";
    const category = "Gardening Tools";

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    className={`w-5 h-5 transition-colors duration-200 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
            );
        }
        return stars;
    };

    return (
        <div className={`px-5 py-10 max-w-6xl mx-auto transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Breadcrumb */}
            <nav className="mb-8">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                    <li>
                        <Link to="/" className="flex items-center hover:text-blue-600 transition-colors duration-200">
                            <Home className="w-4 h-4 mr-1" />
                            Home
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-gray-800 font-medium">{product.name}</span>
                    </li>
                </ol>
            </nav>

            <div className='flex flex-col md:flex-row gap-10'>
                {/* Product Image */}
                <div className='md:w-1/2 transform transition-transform duration-300 hover:scale-105'>
                    <img 
                        className='w-full h-auto max-h-96 object-cover rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl' 
                        src={product.image} 
                        alt={product.name}
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
                
                {/* Product Details */}
                <div className='md:w-1/2 space-y-6'>
                    <h1 className='text-3xl font-bold text-gray-800'>{product.name}</h1>
                    
                    {/* Price */}
                    <div className='flex items-center gap-4'>
                        <span className='text-2xl font-semibold text-green-600'>
                            ${discountedPrice.toFixed(2)}
                        </span>
                        {product.discount > 0 && (
                            <>
                                <span className='text-lg text-gray-500 line-through'>
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className='text-sm bg-red-100 text-red-600 px-2 py-1 rounded animate-pulse'>
                                    {product.discount}% OFF
                                </span>
                            </>
                        )}
                    </div>
                    
                    {/* Rating */}
                    <div className='flex items-center gap-2'>
                        <div className='flex'>
                            {renderStars(Math.floor(product.rating))}
                        </div>
                        <span className='text-gray-600'>{product.rating}</span>
                        <span className='text-gray-500'>({product.reviews} reviews)</span>
                    </div>
                    
                    {/* Description */}
                    <div>
                        <h2 className='text-xl font-semibold text-gray-800 mb-2'>Description</h2>
                        <p className='text-gray-600 leading-relaxed'>{description}</p>
                    </div>
                    
                    {/* Category */}
                    <div>
                        <h2 className='text-xl font-semibold text-gray-800 mb-2'>Category</h2>
                        <p className='text-gray-600'>{category}</p>
                    </div>
                    
                    {/* Dummy Fields */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='hover:bg-gray-50 p-2 rounded transition-colors duration-200'>
                            <h3 className='font-semibold text-gray-800'>Brand</h3>
                            <p className='text-gray-600'>GardenPro</p>
                        </div>
                        <div className='hover:bg-gray-50 p-2 rounded transition-colors duration-200'>
                            <h3 className='font-semibold text-gray-800'>Availability</h3>
                            <p className='text-gray-600'>In Stock</p>
                        </div>
                        <div className='hover:bg-gray-50 p-2 rounded transition-colors duration-200'>
                            <h3 className='font-semibold text-gray-800'>Shipping</h3>
                            <p className='text-gray-600'>Free Shipping</p>
                        </div>
                        <div className='hover:bg-gray-50 p-2 rounded transition-colors duration-200'>
                            <h3 className='font-semibold text-gray-800'>Warranty</h3>
                            <p className='text-gray-600'>1 Year</p>
                        </div>
                    </div>
                    
                    {/* Buttons */}
                    <div className='flex gap-4 pt-6'>
                        <button className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg'>
                            Add to Cart
                        </button>
                        <button className='bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg'>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails