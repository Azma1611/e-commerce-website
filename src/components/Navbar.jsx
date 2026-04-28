import React from 'react';
import { Search, ShoppingCart, MapPin, ChevronDown, Menu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ cartCount, onCartClick, searchQuery, setSearchQuery }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="w-full flex flex-col z-50 sticky top-0 shadow-md">
            {/* Top Nav */}
            <div className="bg-purple-900 text-white px-2 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center border border-transparent hover:border-white p-1 rounded-sm mt-1 shrink-0">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tighter italic leading-none">Dheza<span className="text-yellow-400">.in</span></span>
                </Link>

                {/* Location */}
                <div className="hidden md:flex items-center border border-transparent hover:border-white p-1 rounded-sm cursor-pointer shrink-0">
                    <MapPin size={18} className="mt-2 mr-1 text-white" />
                    <div className="flex flex-col leading-tight">
                        <span className="text-[11px] text-gray-300">Deliver to</span>
                        <span className="text-sm font-bold">India</span>
                    </div>
                </div>

                {/* Search */}
                <form onSubmit={handleSearchSubmit} className="flex-1 hidden sm:flex h-10 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-yellow-400 border-none mx-2">
                    <select className="bg-gray-100 text-gray-700 text-xs px-2 border-r border-gray-300 outline-none w-auto max-w-[120px] cursor-pointer hover:bg-gray-200 hidden md:block">
                        <option>All Categories</option>
                        <option>Deals</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                    </select>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 text-black px-3 outline-none text-sm"
                        placeholder="Search Dheza.in"
                    />
                    <button type="submit" className="btn btn-accent btn-icon h-full px-5 rounded-none transition-colors">
                        <Search size={20} />
                    </button>
                </form>

                {/* Right Side Nav */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    {/* Accounts & Lists */}
                    <div
                        className="flex flex-col border border-transparent hover:border-white p-1 rounded-sm cursor-pointer"
                        onClick={() => user ? logout() : navigate('/login')}
                    >
                        <span className="text-[11px] leading-tight text-white">{user ? `Hello, ${user.name}` : 'Hello, sign in'}</span>
                        <span className="text-sm font-bold leading-tight flex items-center">Account & Lists <ChevronDown size={14} className="ml-1 text-gray-400 hidden lg:block" /></span>
                    </div>

                    {/* Returns & Orders */}
                    <div className="hidden lg:flex flex-col border border-transparent hover:border-white p-1 rounded-sm cursor-pointer">
                        <span className="text-[11px] leading-tight text-white">Returns</span>
                        <span className="text-sm font-bold leading-tight">& Orders</span>
                    </div>

                    {/* Cart */}
                    <div className="flex items-end border border-transparent hover:border-white p-1 rounded-sm cursor-pointer relative" onClick={onCartClick}>
                        <div className="relative flex items-end">
                            <ShoppingCart size={34} />
                            <span className="absolute -top-1 left-[14px] text-yellow-400 font-bold text-base leading-none bg-purple-900 px-1 rounded-full">{cartCount}</span>
                        </div>
                        <span className="text-sm font-bold leading-tight mb-1 hidden sm:block">Cart</span>
                    </div>
                </div>
            </div>

            {/* Sub Nav */}
            <div className="bg-purple-800 text-white px-2 sm:px-4 py-1 flex items-center gap-2 sm:gap-4 text-sm overflow-x-auto whitespace-nowrap">
                <button className="flex items-center gap-1 border border-transparent hover:border-white p-1 rounded-sm font-bold">
                    <Menu size={20} /> All
                </button>
                <Link to="/deals" className="border border-transparent hover:border-white p-1 rounded-sm">Today's Deals</Link>
                <Link to="/electronics" className="border border-transparent hover:border-white p-1 rounded-sm hidden sm:block">Electronics</Link>
                <Link to="/fashion" className="border border-transparent hover:border-white p-1 rounded-sm hidden sm:block">Fashion</Link>
                <Link to="/beauty" className="border border-transparent hover:border-white p-1 rounded-sm hidden md:block">Beauty</Link>
                <Link to="/shop" className="border border-transparent hover:border-white p-1 rounded-sm">New Releases</Link>
            </div>
        </header>
    );
};
export default Navbar;