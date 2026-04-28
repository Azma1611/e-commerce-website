import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ChevronRight, CircleDot, Circle, CheckCircle2, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState('upi');

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
    const total = subtotal + shipping;

    const handlePlaceOrder = () => {
        alert('Order placed successfully! Thank you for shopping with Dheza.');
        clearCart();
        navigate('/');
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center p-6 text-center">
                <div className="glass-premium p-12 rounded-[2.5rem] max-w-md w-full shadow-premium">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck size={40} className="text-slate-300" />
                    </div>
                    <h2 className="text-3xl font-playfair font-black text-slate-900 mb-4">Your bag is empty</h2>
                    <p className="text-slate-500 mb-8 font-medium">Add some elegant pieces to your collection before checking out.</p>
                    <button 
                        onClick={() => navigate('/shop')} 
                        className="btn btn-primary btn-lg w-full rounded-xl"
                    >
                        Explore Collection
                    </button>
                </div>
            </div>
        );
    }

    const steps = [
        { id: 1, title: 'Shipping', icon: Truck },
        { id: 2, title: 'Payment', icon: CreditCard },
        { id: 3, title: 'Review', icon: CheckCircle2 }
    ];

    return (
        <div className="min-h-screen bg-bg-light pb-24">
            {/* Premium Checkout Header */}
            <header className="sticky top-0 z-50 glass-premium border-b border-white/40 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center group">
                        <span className="text-2xl font-playfair font-black tracking-tighter text-slate-900 italic group-hover:text-accent transition-colors">Dheza.</span>
                    </Link>
                    
                    {/* Progress Indicator */}
                    <div className="hidden md:flex items-center space-x-8">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div className={`flex items-center space-x-3 ${activeStep >= step.id ? 'text-primary' : 'text-slate-300'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${activeStep >= step.id ? 'border-accent bg-accent/10 text-accent' : 'border-slate-200'}`}>
                                        {activeStep > step.id ? <CheckCircle2 size={16} /> : <step.icon size={16} />}
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-[0.2em]">{step.title}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-12 h-[2px] mx-4 transition-colors ${activeStep > step.id ? 'bg-accent' : 'bg-slate-100'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center text-slate-400 space-x-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                        <Lock size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout</span>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column - Steps */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* Step 1: Delivery Address */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`glass-premium rounded-3xl overflow-hidden transition-all duration-500 ${activeStep === 1 ? 'ring-2 ring-accent ring-offset-4 shadow-premium' : 'opacity-70 shadow-sm'}`}
                    >
                        <div 
                            className={`px-8 py-6 flex items-center justify-between cursor-pointer`}
                            onClick={() => setActiveStep(1)}
                        >
                            <div className="flex items-center space-x-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${activeStep === 1 ? 'bg-accent text-primary' : 'bg-slate-100 text-slate-400'}`}>
                                    01
                                </div>
                                <div>
                                    <h2 className="text-xl font-playfair font-black text-slate-900">Shipping Details</h2>
                                    {activeStep > 1 && <p className="text-xs text-slate-500 font-medium mt-1">{user?.name || 'Ajay S'} • 123 Tech Park...</p>}
                                </div>
                            </div>
                            {activeStep !== 1 && <span className="btn btn-ghost btn-sm text-accent font-black uppercase tracking-widest">Change</span>}
                        </div>

                        <AnimatePresence>
                            {activeStep === 1 && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-8 pb-8 border-t border-slate-100 pt-8"
                                >
                                    <div 
                                        className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${selectedAddress === 1 ? 'border-accent bg-accent/5' : 'border-slate-100 hover:border-slate-200'}`}
                                        onClick={() => setSelectedAddress(1)}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAddress === 1 ? 'border-accent bg-accent' : 'border-slate-200'}`}>
                                                {selectedAddress === 1 && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white px-3 py-1 rounded-full shadow-sm">Work</span>
                                        </div>
                                        <p className="font-black text-slate-900 mb-1">{user?.name || 'Ajay S'}</p>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                            123 Tech Park, Block B, Floor 4<br />
                                            Bangalore, Karnataka 560001<br />
                                            India
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <button
                                            onClick={() => setActiveStep(2)}
                                            className="btn btn-primary btn-lg px-10 rounded-xl"
                                        >
                                            Deliver to this address
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Step 2: Payment Method */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`glass-premium rounded-3xl overflow-hidden transition-all duration-500 ${activeStep === 2 ? 'ring-2 ring-accent ring-offset-4 shadow-premium' : 'opacity-70 shadow-sm'}`}
                    >
                        <div 
                            className={`px-8 py-6 flex items-center justify-between ${activeStep >= 2 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            onClick={() => activeStep >= 2 && setActiveStep(2)}
                        >
                            <div className="flex items-center space-x-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${activeStep === 2 ? 'bg-accent text-primary' : 'bg-slate-100 text-slate-400'}`}>
                                    02
                                </div>
                                <div>
                                    <h2 className="text-xl font-playfair font-black text-slate-900">Payment Selection</h2>
                                    {activeStep > 2 && <p className="text-xs text-slate-500 font-medium mt-1">{selectedPayment.toUpperCase()} Method Selected</p>}
                                </div>
                            </div>
                            {activeStep > 2 && <span className="btn btn-ghost btn-sm text-accent font-black uppercase tracking-widest">Change</span>}
                        </div>

                        <AnimatePresence>
                            {activeStep === 2 && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-8 pb-8 border-t border-slate-100 pt-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { id: 'upi', label: 'UPI Payment', desc: 'Google Pay, PhonePe, etc.' },
                                            { id: 'card', label: 'Credit / Debit Card', desc: 'All major cards supported' },
                                            { id: 'netbanking', label: 'Net Banking', desc: 'All major Indian banks' },
                                            { id: 'cod', label: 'Pay on Delivery', desc: 'Cash or QR on delivery' }
                                        ].map((method) => (
                                            <div 
                                                key={method.id}
                                                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center space-x-4 ${selectedPayment === method.id ? 'border-accent bg-accent/5' : 'border-slate-50 hover:border-slate-200 bg-slate-50/50'}`}
                                                onClick={() => setSelectedPayment(method.id)}
                                            >
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === method.id ? 'border-accent bg-accent' : 'border-slate-200'}`}>
                                                    {selectedPayment === method.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm text-slate-900">{method.label}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{method.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8">
                                        <button
                                            onClick={() => setActiveStep(3)}
                                            className="btn btn-primary btn-lg px-10 rounded-xl"
                                        >
                                            Continue with {selectedPayment.toUpperCase()}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Step 3: Review Items */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`glass-premium rounded-3xl overflow-hidden transition-all duration-500 ${activeStep === 3 ? 'ring-2 ring-accent ring-offset-4 shadow-premium' : 'opacity-70 shadow-sm'}`}
                    >
                        <div className="px-8 py-6 flex items-center space-x-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${activeStep === 3 ? 'bg-accent text-primary' : 'bg-slate-100 text-slate-400'}`}>
                                03
                            </div>
                            <h2 className="text-xl font-playfair font-black text-slate-900">Review & Confirm</h2>
                        </div>

                        <AnimatePresence>
                            {activeStep === 3 && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-8 pb-8 border-t border-slate-100 pt-8"
                                >
                                    <div className="space-y-6 mb-8">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center shadow-sm">
                                                        <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black text-slate-900 line-clamp-1">{item.title}</h4>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <span className="font-black text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-slate-900 p-8 rounded-3xl text-white">
                                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">Total Amount</p>
                                                <h3 className="text-4xl font-playfair font-black tracking-tighter text-white">₹{total.toLocaleString('en-IN')}</h3>
                                            </div>
                                            <button
                                                onClick={handlePlaceOrder}
                                                className="btn btn-accent btn-lg px-12 rounded-xl text-primary font-black uppercase tracking-widest"
                                            >
                                                Confirm Order
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Right Column - Summary Box */}
                <div className="lg:col-span-4">
                    <div className="sticky top-28 space-y-6">
                        <div className="glass-premium rounded-3xl p-8 shadow-premium border border-white/60">
                            <h3 className="text-xl font-playfair font-black text-slate-900 mb-8 pb-4 border-b border-slate-100">Order Summary</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Subtotal ({cartItems.length} items)</span>
                                    <span className="text-slate-900 font-black">₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Shipping</span>
                                    <span className="text-slate-900 font-black">{shipping === 0 ? <span className="text-green-600 italic">Free</span> : `₹${shipping}`}</span>
                                </div>
                                {shipping === 0 && (
                                    <div className="flex justify-between text-xs bg-green-50 text-green-700 p-3 rounded-xl border border-green-100 font-bold">
                                        <span>First order perk applied</span>
                                        <span>-₹99.00</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-end pt-6 border-t border-slate-100 mb-8">
                                <span className="text-sm font-black uppercase tracking-widest text-slate-400">Grand Total</span>
                                <span className="text-3xl font-playfair font-black text-slate-900 tracking-tighter">₹{total.toLocaleString('en-IN')}</span>
                            </div>
                            
                            <button
                                onClick={handlePlaceOrder}
                                disabled={activeStep !== 3}
                                className={`btn btn-primary btn-lg w-full rounded-xl transition-all shadow-xl ${activeStep !== 3 ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                            >
                                {activeStep === 3 ? 'Place Secure Order' : `Complete Step ${activeStep}`}
                            </button>
                        </div>

                        {/* Security Badge */}
                        <div className="bg-white/40 backdrop-blur-sm border border-white/60 rounded-2xl p-6 flex items-start space-x-4 shadow-sm">
                            <ShieldCheck className="text-accent shrink-0" size={24} />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-1">Buyer Protection</p>
                                <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                                    Your order is secured with 256-bit SSL encryption and full purchase protection.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;