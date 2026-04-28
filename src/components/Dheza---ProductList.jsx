import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const ProductList = ({ products, searchQuery = '', onAddToCart, onQuickView, isLoading }) => {
    const [activeCardId, setActiveCardId] = useState(null);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="bg-white/40 backdrop-blur-md p-5 rounded-3xl border border-white/60 h-[380px] flex flex-col shadow-sm">
                        <div className="h-60 bg-white/50 rounded-2xl mb-4 animate-pulse"></div>
                        <div className="h-4 bg-white/60 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-white/60 rounded w-1/2 mb-4 animate-pulse"></div>
                        <div className="mt-auto h-10 bg-white/60 rounded-full animate-pulse"></div>
                    </div>
                ))}
            </div>
        );
    }

    // Real-time filtering logic
    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filtered.length === 0) {
        return (
            <div className="py-20 text-center bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-white/60">
                <h3 className="text-2xl font-playfair font-bold text-slate-400 mb-2">No elegant matches found</h3>
                <p className="text-slate-500 font-light">Try adjusting your search to find your perfect piece.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
            {filtered.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    isActive={activeCardId === product.id}
                    onToggle={() => setActiveCardId(activeCardId === product.id ? null : product.id)}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                />
            ))}
        </motion.div>
    );
};
export default ProductList;