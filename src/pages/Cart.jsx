import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 text-center flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-32 h-32 bg-white shadow-md border border-gray-100"
                >
                    <ShoppingBag size={48} className="text-slate-300" strokeWidth={1} />
                </motion.div>
                <h2 className="text-4xl font-bold text-primary mb-4 tracking-tight">Your Cart is Empty</h2>
                <p className="text-slate-500 font-light mb-10 max-w-md text-lg">Looks like you haven't added any luxury pieces to your cart yet.</p>
                <button
                    onClick={() => navigate('/shop')}
                    className="bg-accent text-primary hover:bg-accent-hover px-10 py-4 rounded-full font-bold text-sm tracking-wider uppercase hover:shadow-[0_10px_30px_rgba(168,85,247,0.3)] transition-all duration-300 flex items-center gap-3 active:scale-95"
                >
                    <span>Continue Shopping</span> <ArrowRight size={18} />
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-20">
            <div className="flex items-end justify-between mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Shopping Bag</h1>
                <span className="text-slate-500 font-medium tracking-wide uppercase text-sm hidden sm:block">
                    {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="flex-1 space-y-6">
                    <AnimatePresence mode="popLayout">
                        {cartItems.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </AnimatePresence>

                    <div className="flex justify-end mt-6">
                        <button onClick={clearCart} className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors">
                            Clear Entire Cart
                        </button>
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="w-full lg:w-[400px]">
                    <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-32">
                        <h2 className="text-2xl font-playfair font-bold text-slate-800 mb-8">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-slate-600 font-light"><span>Subtotal</span> <span className="font-medium text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span></div>
                            <div className="flex justify-between text-slate-600 font-light"><span>Estimated Shipping</span> {shipping === 0 ? <span className="font-bold text-purple-500 uppercase tracking-wider text-xs flex items-center mt-1">Free</span> : <span className="font-medium text-slate-800">₹{shipping}</span>}</div>
                        </div>
                        <div className="border-t border-white/60 pt-6 mb-8 flex justify-between items-end">
                            <span className="text-slate-800 font-bold uppercase tracking-widest text-sm">Total</span>
                            <span className="text-4xl font-bold text-primary tracking-tighter">₹{total.toLocaleString('en-IN')}</span>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-xl font-bold text-lg shadow-sm border border-yellow-500 transition-colors active:scale-95 mb-4"
                        >
                            Proceed to Checkout
                        </button>
                        <div className="flex items-center justify-center space-x-2 text-slate-400 text-xs font-medium"><ShieldCheck size={16} /> <span>SSL Encrypted & Secure Payment</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Cart;