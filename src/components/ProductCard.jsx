import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, isActive, onToggle, onAddToCart, onQuickView }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="glass-premium p-6 flex flex-col h-full transition-all duration-500 rounded-xl group cursor-pointer relative"
        >
            {/* Deal Badge */}
            {product.isDeal && product.discount && (
                <div className="absolute top-4 left-4 bg-slate-900 text-accent text-[9px] font-black px-3 py-1.5 rounded-full z-10 shadow-xl uppercase tracking-widest">
                    -{product.discount}%
                </div>
            )}

            <div
                className="h-64 flex items-center justify-center mb-6 bg-white/40 rounded-lg overflow-hidden p-8 relative"
                onClick={() => navigate(`/product/${product.id}`)}
            >
                {!imageLoaded && <div className="absolute inset-0 bg-slate-100 animate-pulse" />}
                <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    className={`max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Premium View Detail Button on Hover */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-500 flex items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="btn btn-white btn-sm rounded-full text-[9px] font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 tracking-[0.2em] border border-slate-100"
                    >
                        VIEW DETAILS
                    </motion.span>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black text-accent uppercase tracking-[0.3em]">{product.category}</span>
                    <div className="flex items-center space-x-1">
                        <Star size={10} className="fill-accent text-accent" />
                        <span className="text-[10px] font-black text-slate-400">{product.rating || 5.0}</span>
                    </div>
                </div>

                <h3 onClick={() => navigate(`/product/${product.id}`)} className="text-lg font-playfair font-black line-clamp-1 mb-4 text-slate-900 group-hover:text-accent transition-colors">
                    {product.title}
                </h3>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest line-through">
                            {product.isDeal && product.discount ? `₹${Math.floor(product.price / (1 - product.discount / 100)).toLocaleString('en-IN')}` : ''}
                        </span>
                        <span className="text-xl font-black text-slate-900 tracking-tighter">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                        className="btn btn-primary btn-icon w-12 h-12 rounded-lg hover:btn-accent transition-all active:scale-90 shadow-lg"
                    >
                        <ShoppingCart size={18} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
export default ProductCard;