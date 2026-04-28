import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '../components/ProductGrid';
import productsData from '../data/products.json';
import { Filter, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = ({ onAddToCart, onQuickView }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';
  const initialSearch = queryParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(200000);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Sync state with URL query params
  React.useEffect(() => {
    setSelectedCategory(initialCategory);
    setSearchQuery(initialSearch);
  }, [initialCategory, initialSearch]);

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let result = productsData.filter(p => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchPrice = p.price <= priceRange;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchPrice && matchSearch;
    });

    if (sortBy === 'low-high') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'high-low') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [selectedCategory, priceRange, sortBy, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 md:px-8 py-12 flex flex-col md:flex-row gap-12 max-w-[1600px] mx-auto"
    >
      {/* Sidebar Filters */}
      <aside className="w-full md:w-72 space-y-10 bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 h-fit sticky top-32">
        <div>
          <h3 className="text-xl font-black mb-8 flex items-center space-x-3 text-primary uppercase tracking-tighter italic">
            <Filter size={20} className="text-accent" />
            <span>Refine Selection</span>
          </h3>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <p className="font-medium mb-3 text-sm uppercase tracking-wider text-text-muted">Category</p>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedCategory === cat ? 'border-accent bg-accent' : 'border-gray-200 group-hover:border-accent'}`}>
                      {selectedCategory === cat && <div className="w-2 h-2 bg-white rounded-full" />}
                      <input
                        type="radio"
                        className="hidden"
                        onChange={() => setSelectedCategory(cat)}
                      />
                    </div>
                    <span className={`text-sm ${selectedCategory === cat ? 'font-bold text-primary' : 'text-text-muted group-hover:text-primary'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <p className="font-medium mb-3 text-sm uppercase tracking-wider text-text-muted">Price Range</p>
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-xs mt-2 text-text-muted font-medium">
                <span>₹0</span>
                <span className="text-primary font-bold">Up to ₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Our Collection</h1>
            <p className="text-text-muted text-sm mt-1">{filteredProducts.length} items found</p>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-3 pr-12 text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-accent w-full shadow-sm cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white p-20 rounded-[2.5rem] text-center shadow-xl border border-gray-50">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-text-muted">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

    </motion.div>
  );
};

export default Shop;
