import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  // Reset the loaded state when the image prop changes
  React.useEffect(() => {
    setImageLoaded(false);
  }, [product.image]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 flex flex-col h-full hover:shadow-xl transition-shadow border border-gray-100 rounded-xl group"
    >
      <div
        className="h-64 flex items-center justify-center mb-6 cursor-pointer bg-gray-50 rounded-lg overflow-hidden p-4 relative product-card-image-container"
        onClick={() => onQuickView(product)}
      >
        {!imageLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`max-h-full max-w-full object-contain hover:scale-110 transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="quick-view-overlay">
          <span className="bg-white/90 text-primary px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <h3
          onClick={() => onQuickView(product)}
          className="text-sm font-medium line-clamp-2 mb-1 hover:text-orange-600 cursor-pointer transition-colors leading-snug"
        >
          {product.title}
        </h3>

        <div className="flex items-center space-x-1 mb-1">
          <div className="flex items-center text-orange-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${i < Math.floor(product.rating) ? 'fill-orange-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-blue-600 hover:text-orange-600 cursor-pointer">{product.reviewsCount}</span>
        </div>

        <div className="flex items-baseline mb-4">
          <span className="text-xs font-bold mr-0.5 mt-[-4px]">₹</span>
          <span className="text-2xl font-bold">{product.price.toLocaleString('en-IN')}</span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="btn btn-accent btn-md w-full rounded-full text-xs font-bold shadow-sm transition-all active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export const ProductGrid = ({ products, onAddToCart, onQuickView }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
