import React from 'react';
import ProductList from '../components/ProductList';
import productsData from '../data/products.json';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import happyShoppingBanner from '../assets/happy-shopping.png';

const Home = ({ searchQuery, onAddToCart, onQuickView }) => {
  const navigate = useNavigate();

  // Defensive check for products data
  const products = Array.isArray(productsData) ? productsData : [];

  // Show featured products (first 10)
  const featuredProducts = products.slice(0, 10);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="pb-24">
      {/* Premium Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden mesh-gradient">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 bg-slate-900/5"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        </motion.div>

        <div className="relative h-full mx-auto pl-[100px] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-6 bg-accent/5 px-4 py-2 rounded-full border border-accent/20 shadow-sm">
              Spring Collection 2024
            </span>
            <h1 className="text-5xl md:text-6xl font-playfair font-black text-slate-900 leading-tight mb-8 tracking-tighter">
              Curated <br /> <span className="italic text-accent">Excellence.</span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl font-medium max-w-md mb-10 leading-relaxed">
              Discover a world of premium products selected for their exceptional quality and timeless design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/shop')}
                className="btn btn-accent btn-lg px-12 rounded-lg font-bold text-sm shadow-xl active:scale-95 border border-yellow-500"
              >
                Shop Collection
              </button>
              <button
                onClick={() => navigate('/deals')}
                className="btn btn-ghost btn-lg px-12 bg-slate-900/5 backdrop-blur-md border border-slate-200 text-black rounded-lg font-bold text-sm hover:bg-slate-900/10 transition-all active:scale-95"
              >
                View Deals
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 right-12 hidden lg:flex space-x-12">
          <div className="text-slate-900">
            <p className="text-3xl font-playfair font-black text-primary">50k+</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Curated Items</p>
          </div>
          <div className="text-slate-900 border-l border-slate-200 pl-12">
            <p className="text-3xl font-playfair font-black text-primary">100%</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quality Guarantee</p>
          </div>
        </div>
      </section>

      {/* Featured Categories/Promotions */}
      <section className="max-w-7xl pl-[100px] pr-6 mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Tech Essentials', category: 'Electronics', img: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=800' },
            { title: 'Modern Fashion', category: 'Fashion', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800' },
            { title: 'Natural Beauty', category: 'Beauty', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800' }
          ].map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/${cat.category.toLowerCase()}`)}
              className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-premium"
            >
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white text-2xl font-playfair font-black mb-1">{cat.title}</p>
                <span className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">Explore Now →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl pl-[100px] pr-6 mt-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Curated Selection</span>
            <h2 className="text-5xl font-playfair font-black text-slate-900 tracking-tight leading-tight">Best Sellers in <br /> <span className="italic text-slate-400">Electronics</span></h2>
          </div>
          <button
            onClick={() => navigate('/electronics')}
            className="group flex items-center space-x-3 text-slate-900 font-black uppercase tracking-widest text-[10px] hover:text-accent transition-colors"
          >
            <span>View All Products</span>
            <div className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center group-hover:border-accent group-hover:translate-x-2 transition-all">
              →
            </div>
          </button>
        </div>

        <div className="bg-white/50 backdrop-blur-xl p-10 rounded-xl border border-white shadow-premium">
          <ProductList
            products={featuredProducts.filter(p => p.category === 'Electronics')}
            searchQuery={searchQuery}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
