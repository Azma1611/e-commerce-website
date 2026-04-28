import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { removeFromCart, increaseQty, decreaseQty } = useCart();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="bg-white/40 backdrop-blur-md border border-white/60 p-4 md:p-6 rounded-[2rem] shadow-sm flex flex-col sm:flex-row items-center gap-6 group"
        >
            <div className="w-full sm:w-32 h-32 bg-white/50 rounded-2xl flex items-center justify-center p-4 shrink-0">
                <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>

            <div className="flex-1 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500 mb-1 block">{item.category}</span>
                <h3 className="text-lg font-playfair font-bold text-slate-800 line-clamp-2 mb-2">{item.title}</h3>
                <div className="text-xl font-bold text-slate-800">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
            </div>

            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center bg-white/60 rounded-full border border-white/80 shadow-sm overflow-hidden">
                    <button
                        onClick={() => decreaseQty(item.id)}
                        disabled={item.quantity <= 1}
                        className="p-3 text-slate-500 hover:text-purple-600 hover:bg-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                        <Minus size={16} strokeWidth={2.5} />
                    </button>
                    <span className="w-8 text-center font-bold text-slate-800 text-sm">{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)} className="p-3 text-slate-500 hover:text-purple-600 hover:bg-white transition-colors">
                        <Plus size={16} strokeWidth={2.5} />
                    </button>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Remove item">
                    <X size={20} strokeWidth={2.5} />
                </button>
            </div>
        </motion.div>
    );
};

export default CartItem;