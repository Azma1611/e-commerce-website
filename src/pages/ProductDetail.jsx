import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';

const ProductDetail = ({ onAddToCart, onBuyNow }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);
        setIsLoading(true);

        // Simulate a network request
        const timer = setTimeout(() => {
            const foundProduct = productsData.find(p => p.id === parseInt(id));
            setProduct(foundProduct);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 animate-pulse flex flex-col md:flex-row gap-12">
                <div className="w-full md:w-1/2 h-[500px] bg-white/40 backdrop-blur-md rounded-[2.5rem]"></div>
                <div className="w-full md:w-1/2 space-y-6 pt-4">
                    <div className="h-6 bg-white/50 rounded-md w-1/4"></div>
                    <div className="h-10 bg-white/50 rounded-md w-3/4"></div>
                    <div className="h-8 bg-white/50 rounded-md w-1/3"></div>
                    <div className="h-32 bg-white/50 rounded-md w-full"></div>
                    <div className="h-14 bg-white/50 rounded-full w-full mt-8"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <h2 className="text-4xl font-playfair font-black text-slate-800 mb-4">Product Not Found</h2>
                <p className="text-slate-500 font-light mb-8">The piece you're looking for doesn't exist or has been removed.</p>
                <button onClick={() => navigate('/')} className="btn btn-primary btn-lg rounded-full font-bold shadow-md">
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto px-4 md:px-8 py-12"
        >
            <button onClick={() => navigate(-1)} className="flex items-center space-x-3 text-slate-500 hover:text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] mb-12 transition-all group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> <span>Back to Collection</span>
            </button>

            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                {/* Left Side: Product Image */}
                <div className="w-full lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-premium p-8 rounded-xl shadow-premium flex items-center justify-center h-[400px] lg:h-[500px] sticky top-32 transition-all duration-700 overflow-hidden group"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out"
                        />
                        <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm hover:bg-white cursor-pointer transition-all">
                            <Star size={18} className="text-accent" />
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Product Details */}
                <div className="w-full lg:w-1/2 flex flex-col pt-2">
                    <div className="flex items-center space-x-3 mb-4">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent bg-accent/5 px-3 py-1 rounded-full border border-accent/10">{product.category}</span>
                        <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-green-100">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
                            In Stock
                        </div>
                    </div>

                    <h1 className="text-3xl lg:text-5xl font-playfair font-black text-slate-900 leading-tight mb-6 tracking-tighter">{product.title}</h1>

                    <div className="flex items-center space-x-5 mb-8 pb-8 border-b border-slate-100">
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className={i < Math.floor(product.rating || 5) ? 'fill-accent text-accent' : 'text-slate-200'} />
                            ))}
                            <span className="ml-2 font-black text-slate-900 text-[10px] tracking-tighter">{product.rating}</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{product.reviewsCount} verified reviews</span>
                    </div>

                    <div className="flex items-baseline mb-8">
                        <span className="text-3xl font-playfair font-black text-slate-900 tracking-tighter">₹{product.price.toLocaleString('en-IN')}</span>
                        <span className="ml-4 text-slate-300 text-lg line-through font-medium italic">₹{Math.floor(product.price * 1.2).toLocaleString('en-IN')}</span>
                        <span className="ml-6 text-[9px] font-black text-accent uppercase tracking-widest bg-accent/5 px-2 py-0.5 rounded-lg">Save 20%</span>
                    </div>

                    <p className="text-slate-500 leading-relaxed font-medium mb-10 text-base max-w-lg">{product.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                        {[
                            { icon: Truck, text: 'Express Delivery' },
                            { icon: RotateCcw, text: '30-Day Returns' },
                            { icon: ShieldCheck, text: 'Secure Payment' }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center group hover:border-accent/30 transition-all">
                                <item.icon size={20} className="text-slate-400 group-hover:text-accent transition-colors mb-2" strokeWidth={1.5} />
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 mt-auto">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onBuyNow(product)}
                            className="btn btn-primary btn-xl flex-1 rounded-lg font-black text-[11px] uppercase tracking-[0.3em] shadow-premium relative overflow-hidden group"
                        >
                            <span className="relative z-10">Purchase Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/5 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onAddToCart(product)}
                            className="btn btn-outline btn-xl flex-1 rounded-lg font-black text-[11px] uppercase tracking-[0.3em] border-2 border-slate-900/5 hover:border-slate-900 transition-all flex items-center justify-center gap-3"
                        >
                            <ShoppingCart size={18} strokeWidth={2.5} /> Add to Cart
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
export default ProductDetail;