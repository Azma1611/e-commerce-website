import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import productsData from '../data/products.json';

const CategoryPage = ({ category, searchQuery, onAddToCart, onQuickView }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 500); // Simulate network request
        return () => clearTimeout(timer);
    }, [category]);

    const categoryProducts = productsData.filter(p => p.category === category);

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
            <div className="mb-10">
                <h1 className="text-5xl font-playfair font-black text-slate-800 mb-2">{category}</h1>
                <p className="text-slate-500 font-light text-lg">Explore our curated selection of {category.toLowerCase()} essentials.</p>
            </div>

            <ProductList
                products={categoryProducts} searchQuery={searchQuery}
                onAddToCart={onAddToCart} onQuickView={onQuickView} isLoading={isLoading}
            />
        </div>
    );
};
export default CategoryPage;