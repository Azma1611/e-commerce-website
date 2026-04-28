import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import heroImage from '../assets/hero.png';
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Hero Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Overlay Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-light via-transparent to-transparent" />

      {/* Hero Content - Amazon Style */}
      <div className="relative z-10 h-full max-w-[1500px] mx-auto px-4 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl glass-premium p-10 rounded-[2.5rem] shadow-2xl"
        >
          <h1 className="text-6xl font-black text-white mb-6 tracking-tighter leading-none">
            EVERYTHING YOU <span className="text-accent">NEED</span>, <br />DELIVERED TO YOU.
          </h1>

          {/* Main Search Bar in Hero */}
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for anything you want..."
              className="w-full h-16 pl-14 pr-6 bg-white rounded-2xl text-lg font-medium text-primary shadow-2xl focus:ring-4 ring-accent/30 transition-all outline-none"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={24} />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
              Search
            </button>
          </form>

          <div className="mt-6 flex items-center space-x-4 text-white/80 font-medium overflow-x-auto no-scrollbar pb-2">
            <span className="text-xs font-bold text-accent uppercase tracking-widest whitespace-nowrap">Trending:</span>
            {['Smartphone', 'Sneakers', 'Skincare', 'Headphones'].map((item) => (
              <Link key={item} to={`/shop?search=${item}`} className="text-sm hover:text-white transition-colors border-b border-white/20 pb-0.5 whitespace-nowrap">
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Hero;
