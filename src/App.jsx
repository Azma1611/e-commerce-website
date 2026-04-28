import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Deals from './pages/Deals';
import CategoryPage from './pages/CategoryPage';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star } from 'lucide-react';

import productsData from './data/products.json';
import { CartProvider, useCart } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function AppContent() {
  const { cartItems, addToCart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    setQuickViewProduct(null); // Close quick view if open
    setIsCartOpen(true);
  };

  // New function specifically to mimic "Buy Now" flow
  const handleBuyNow = (product) => {
    addToCart(product);
    setQuickViewProduct(null);
    setIsCartOpen(false);
    navigate('/checkout');
  };

  // Prevent body scrolling when a modal/sidebar is open
  useEffect(() => {
    if (isCartOpen || quickViewProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCartOpen, quickViewProduct]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Get related products for the quick view
  const relatedProducts = quickViewProduct
    ? productsData.filter(p => p.category === quickViewProduct.category && p.id !== quickViewProduct.id).slice(0, 4)
    : [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative overflow-x-hidden text-gray-900">

      <Navbar cartCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} />} />
          <Route path="/deals" element={<Deals searchQuery={searchQuery} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} />} />
          <Route path="/electronics" element={<CategoryPage category="Electronics" searchQuery={searchQuery} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} />} />
          <Route path="/fashion" element={<CategoryPage category="Fashion" searchQuery={searchQuery} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} />} />
          <Route path="/beauty" element={<CategoryPage category="Beauty" searchQuery={searchQuery} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} />} />
          <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />} />
          <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <footer className="bg-purple-950 pt-20 pb-12 text-white overflow-hidden relative mt-auto">
        {/* Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between gap-20 mb-24">
            {/* Brand Section */}
            <div className="max-w-sm">
              <div className="text-5xl font-playfair font-black mb-8 tracking-tighter text-white italic">Dheza.</div>
              <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium max-w-xs">
                Redefining luxury shopping through a curated selection of the world's finest products. Excellence in every detail.
              </p>
              <div className="flex space-x-5">
                {[
                  { icon: 'f', label: 'Facebook' },
                  { icon: '𝕏', label: 'Twitter' },
                  { icon: '📷', label: 'Instagram' },
                  { icon: 'in', label: 'LinkedIn' }
                ].map((social) => (
                  <div key={social.label} className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-slate-900 hover:border-accent cursor-pointer transition-all duration-500 shadow-xl group">
                    <span className="text-sm font-black uppercase tracking-tighter group-hover:scale-110 transition-transform">{social.icon}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-16">
              <div>
                <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-8 text-accent">Marketplace</h4>
                <ul className="space-y-5 text-xs text-slate-400 font-bold">
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">SELL PRODUCTS</a></li>
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">ADVERTISE</a></li>
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">AFFILIATES</a></li>
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">FULFILMENT</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-8 text-accent">Support</h4>
                <ul className="space-y-5 text-xs text-slate-400 font-bold">
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">YOUR ACCOUNT</a></li>
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">RETURN CENTRE</a></li>
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">PROTECTION</a></li>
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">HELP DESK</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-8 text-accent">Company</h4>
                <ul className="space-y-5 text-xs text-slate-400 font-bold">
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">OUR STORY</a></li>
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">CAREERS</a></li>
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">PRESS ROOM</a></li>
                  <li><a href="#" className="hover:text-white transition-colors tracking-widest">SUSTAINABILITY</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">
            <div className="flex space-x-10">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-accent transition-colors">Cookies</a>
            </div>
            <p className="opacity-50">© 2024 Dheza Marketplace Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>


      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2 text-primary">
                  <ShoppingBag />
                  <h2 className="text-2xl font-bold">Shopping Cart</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-text-muted">
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="flex flex-col flex-1">
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex space-x-4 border-b pb-4">
                        <img src={item.image} alt={item.title} className="w-20 h-20 object-contain bg-gray-50 rounded" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold">₹{item.price.toLocaleString('en-IN')}</span>
                            <div className="flex items-center space-x-2 border border-gray-200 rounded-md px-2 py-0.5">
                              <button onClick={() => decreaseQty(item.id)} className="text-gray-500 hover:text-primary font-bold text-sm leading-none">-</button>
                              <span className="text-xs text-text-muted w-4 text-center font-medium">{item.quantity}</span>
                              <button onClick={() => increaseQty(item.id)} className="text-gray-500 hover:text-primary font-bold text-sm leading-none">+</button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-600 hover:underline mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t mt-auto space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-gray-400 uppercase tracking-widest">Subtotal</span>
                      <span className="text-3xl font-black text-primary tracking-tighter">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                      className="btn btn-accent btn-lg w-full rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 border border-yellow-500"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black/60 z-[150] backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl bg-white z-[151] shadow-2xl rounded-2xl overflow-hidden max-h-[95vh] flex flex-col"
            >
              <div className="flex flex-col md:flex-row flex-1 overflow-y-auto">
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute right-4 top-4 p-2 bg-white/80 backdrop-blur hover:bg-white rounded-full z-10 shadow-sm"
                >
                  <X size={20} />
                </button>

                <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center sticky top-0 h-fit md:h-auto">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.title}
                    className="max-h-[400px] md:max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>

                <div className="flex-1 p-8 md:p-12 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                      {quickViewProduct.category}
                    </span>
                    <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
                      In Stock
                    </div>
                  </div>

                  <h2 className="text-3xl font-black mb-4 leading-tight text-primary tracking-tighter uppercase">{quickViewProduct.title}</h2>

                  <div className="flex items-center space-x-3 mb-6">
                    <div className="flex items-center bg-orange-50 px-3 py-1 rounded-lg">
                      <div className="flex items-center text-orange-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < Math.floor(quickViewProduct.rating) ? 'fill-orange-400' : 'text-gray-200'} />
                        ))}
                      </div>
                      <span className="text-xs font-black text-orange-700">{quickViewProduct.rating}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-400 border-l pl-3">{quickViewProduct.reviewsCount} verified reviews</span>
                  </div>

                  <div className="flex items-baseline mb-8">
                    <span className="text-lg font-black mr-1 text-primary">₹</span>
                    <span className="text-5xl font-black tracking-tighter text-primary">{quickViewProduct.price.toLocaleString('en-IN')}</span>
                    <span className="ml-3 text-gray-400 line-through text-sm font-bold">₹{(quickViewProduct.price * 1.2).toLocaleString('en-IN')}</span>
                  </div>

                  <div className="space-y-6 mb-10 pb-10 border-b border-gray-100">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Description</h4>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">
                        {quickViewProduct.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Shipping</p>
                        <p className="text-xs font-bold text-primary">Free Express Delivery</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Returns</p>
                        <p className="text-xs font-bold text-primary">30-Day Guarantee</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleBuyNow(quickViewProduct)}
                      className="btn btn-accent btn-lg w-full rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(quickViewProduct)}
                      className="btn btn-primary btn-lg w-full rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
                    >
                      Add to Shopping Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Related Products Section */}
              {relatedProducts.length > 0 && (
                <div className="bg-gray-50 p-8 border-t border-gray-100">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 text-center">You might also like</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.map(product => (
                      <div
                        key={product.id}
                        onClick={() => setQuickViewProduct(product)}
                        className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="h-32 mb-3 flex items-center justify-center overflow-hidden">
                          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform" />
                        </div>
                        <h5 className="text-[10px] font-bold line-clamp-1 mb-1">{product.title}</h5>
                        <p className="text-xs font-black text-primary">₹{product.price.toLocaleString('en-IN')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
