import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Filter, Search, ChevronDown, Grid3x3, List, X, SlidersHorizontal } from "lucide-react";
import Card from './Card';
import { getAllProducts } from '../States/Products/Action';

const ProductsGrid = ({
  showHeader = true,
  headerTitle,
  headerSubtitle,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get('search') || '';

  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Advanced filters
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // ✅ Fetch products from backend on mount
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Update search query when URL changes
  useEffect(() => {
    if (urlSearchQuery) setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  const categories = [
    { id: "all", name: t('all'), emoji: "🌾" },
    { id: "vegetables", name: t('vegetables'), emoji: "🥬" },
    { id: "fruits", name: t('fruits'), emoji: "🍎" },
    { id: "grains", name: t('grains'), emoji: "🌾" },
    { id: "dairy", name: t('dairy'), emoji: "🥛" },
    { id: "organic", name: t('organic'), emoji: "🌿" },
  ];

  const sortOptions = [
    { id: "featured", name: t('featured') },
    { id: "price-low", name: t('priceLowHigh') },
    { id: "price-high", name: t('priceHighLow') },
    { id: "rating", name: t('highestRated') },
    { id: "name", name: t('nameAZ') },
  ];

  // Get unique locations from products
  const locations = [...new Set(products.map(p => p.location))].filter(Boolean);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
  };

  const toggleLocation = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortBy("featured");
    setPriceRange([0, 500]);
    setSelectedLocations([]);
    setOnlyOrganic(false);
    setOnlyInStock(false);
    setMinRating(0);
  };

  // ✅ Filter from Redux products (backend data)
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" ||
      product.category === activeCategory ||
      (activeCategory === "organic" && product.organic);

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === "" ||
      (product.title || product.name || '').toLowerCase().includes(searchLower) ||
      (product.brand && product.brand.toLowerCase().includes(searchLower)) ||
      (product.category && product.category.toLowerCase().includes(searchLower));

    const productPrice = product.discountedPrice || product.price || 0;
    const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];

    const matchesLocation = selectedLocations.length === 0 ||
      selectedLocations.includes(product.location);

    const matchesOrganic = !onlyOrganic || product.organic === true;
    const matchesStock = !onlyInStock || product.stock === true;
    const matchesRating = (product.rating || 0) >= minRating;

    return matchesCategory && matchesSearch && matchesPrice &&
      matchesLocation && matchesOrganic && matchesStock && matchesRating;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
      case "price-high":
        return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "name":
        return (a.title || a.name || '').localeCompare(b.title || b.name || '');
      default:
        return 0;
    }
  });

  const activeFiltersCount =
    (onlyOrganic ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    selectedLocations.length +
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  // ✅ Loading state
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
      <p className="text-gray-500">{t('loadingProducts') || "Loading products..."}</p>
    </div>
  );

  // ✅ Error state
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-red-500 text-lg mb-4">⚠️ {error}</p>
      <button
        onClick={() => dispatch(getAllProducts())}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        {t('tryAgain')}
      </button>
    </div>
  );

  return (
    <>
      {showHeader && (
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            {t('marketplaceBadge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {headerTitle || t('marketplace')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {headerSubtitle || t('marketplaceSubtitle')}
          </p>
          <div className="mt-4 text-sm text-gray-600">
            {t('showingProductCount', { count: sortedProducts.length, total: products.length })}
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-colors ${activeCategory === cat.id
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        <div className="flex gap-3 md:ml-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchProducts')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="relative p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${viewMode === "list" ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{t('advancedFilters')}</h3>
            <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('priceRange')}: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <div className="space-y-2">
                <input type="range" min="0" max="500" value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-full" />
                <input type="range" min="0" max="500" value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('minRatingLabel')}: {minRating > 0 ? `${minRating}+ ⭐` : t('anyRating')}
              </label>
              <input type="range" min="0" max="5" step="0.5" value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))} className="w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('filters')}</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" checked={onlyOrganic} onChange={(e) => setOnlyOrganic(e.target.checked)}
                    className="mr-2 rounded text-green-600 focus:ring-green-500" />
                  <span className="text-sm text-gray-700">{t('organicOnly')} 🌿</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="mr-2 rounded text-green-600 focus:ring-green-500" />
                  <span className="text-sm text-gray-700">{t('inStockOnly')}</span>
                </label>
              </div>
            </div>

            {locations.length > 0 && (
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('filterLocation')}</label>
                <div className="flex flex-wrap gap-2">
                  {locations.map(location => (
                    <button key={location} onClick={() => toggleLocation(location)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedLocations.includes(location)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={clearAllFilters} className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium">
              {t('clearAllFilters')}
            </button>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {(activeFiltersCount > 0 || searchQuery) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery("")} className="hover:text-green-900"><X className="w-3 h-3" /></button>
            </span>
          )}
          {onlyOrganic && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {t('organicOnly')}
              <button onClick={() => setOnlyOrganic(false)} className="hover:text-green-900"><X className="w-3 h-3" /></button>
            </span>
          )}
          {onlyInStock && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {t('inStock')}
              <button onClick={() => setOnlyInStock(false)} className="hover:text-green-900"><X className="w-3 h-3" /></button>
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {minRating}+ {t('rating')}
              <button onClick={() => setMinRating(0)} className="hover:text-green-900"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedLocations.map(loc => (
            <span key={loc} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {loc}
              <button onClick={() => toggleLocation(loc)} className="hover:text-green-900"><X className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
      )}

      {/* Products Grid */}
      <div className={`grid gap-6 ${viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr"
          : "grid-cols-1"
        }`}>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product, index) => (
            <div key={product._id} className="opacity-0 animate-fadeIn flex"
              style={{ animationDelay: `${index * 0.1}s` }}>
              <Card product={product} onAddToCart={handleAddToCart} viewMode={viewMode} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('noResults')}</h3>
            <p className="text-gray-500 mb-4">{t('tryAdjustingSearch') || "Try adjusting your search or filters."}</p>
            <button onClick={clearAllFilters}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              {t('clearAllFilters')}
            </button>
          </div>
        )}
      </div>

      {/* Load More */}
      {sortedProducts.length > 0 && sortedProducts.length < products.length && (
        <div className="text-center mt-12">
          <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 mx-auto">
            {t('loadMore')} <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        input[type="range"] { accent-color: #16a34a; }
      `}</style>
    </>
  );
};

export default ProductsGrid;