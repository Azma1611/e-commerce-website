import React, { useState, useEffect, useMemo } from 'react';
import ProductList from '../components/ProductList';
import productsData from '../data/products.json';

const Deals = ({ searchQuery, onAddToCart, onQuickView }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Generate mock deals deterministically based on product ID
    const dealsProducts = useMemo(() => {
        return productsData
            .filter(p => p.price > 2000)
            .slice(0, 8)
            .map(p => ({
                ...p,
                isDeal: true,
                discount: (p.id % 4 + 2) * 10 // Discounts between 20%, 30%, 40%, 50%
            }));
    }, []);

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
            <div className="mb-10">
                <h1 className="text-5xl font-playfair font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-2 flex items-center">
                    <span className="animate-pulse mr-3">🔥</span> Hot Deals
                </h1>
                <p className="text-slate-500 font-light text-lg">Curated luxury at exceptional value. Up to 50% OFF.</p>
            </div>

            <ProductList products={dealsProducts} searchQuery={searchQuery} onAddToCart={onAddToCart} onQuickView={onQuickView} isLoading={isLoading} />
        </div>
    );
};
export default Deals;