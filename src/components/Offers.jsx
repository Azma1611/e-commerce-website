import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OFFERS = [
  {
    id: 1,
    title: 'Premium Clothing',
    discount: '50% OFF',
    image: 'https://media.craftyartapp.com/uploadedFiles/thumb_file/acf5af6884576a4550d1b0aa69c3af412fa4b5f01673860549.jpg',
    category: 'Fashion'
  },
  {
    id: 2,
    title: 'Latest Smartphones',
    discount: 'UP TO 60% OFF',
    image: 'https://img-prd-pim.poorvika.com/pageimg/Smart-phones-next-gen-shop-now-M.webp',
    category: 'Electronics'
  },
  {
    id: 3,
    title: 'Apparel & Home Essentials',
    discount: '50% OFF',
    image: 'https://images.jdmagicbox.com/comp/temp/deals/bbcf257f4a4b503087b94e375a1aaf09-fvjzp.jpg',
    category: 'Home'
  },
  {
    id: 4,
    title: 'Beauty Products',
    discount: '30% OFF',
    image: 'https://www.banglashoppers.com/media/wysiwyg/category/hot-offer-may-22.jpg',
    category: 'Beauty'
  },
  {
    id: 5,
    title: 'Smart Gadgets',
    discount: '25% OFF',
    image: 'https://assets.aboutamazon.com/dims4/default/315d9b7/2147483647/strip/true/crop/1280x720+0+0/resize/1280x720!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F19%2F68%2Fb69f14d04488bb8d1bb700699f32%2Fcharger.jpg',
    category: 'Electronics'
  },
  {
    id: 6,
    title: 'Trending Footwear',
    discount: '45% OFF',
    image: 'https://cdn4.singleinterface.com/files/enterprise/coverphoto/458981/1-760X350-2-27-02-26-11-13-42.png',
    category: 'Fashion'
  }
];

const Offers = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="max-w-[1500px] mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-black text-primary mb-2 tracking-tighter">SPECIAL OFFERS</h2>
        <p className="text-text-muted text-lg">Limited Time Deals - Grab them before they're gone!</p>
        <div className="h-1 w-24 bg-accent mx-auto mt-4 rounded-full"></div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {OFFERS.map((offer) => (
          <motion.div
            key={offer.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            onClick={() => navigate(`/shop?category=${offer.category}`)}
            className="relative group overflow-hidden rounded-xl shadow-lg bg-white cursor-pointer h-96"
          >
            {/* Image Container */}
            <div className="relative h-full overflow-hidden bg-gray-200">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {/* Dark Overlay - More prominent */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>

            {/* Content Overlay - Always visible at bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="transform group-hover:translate-y-0 transition-transform duration-300"
              >
                <p className="text-xs font-bold text-accent mb-2 uppercase tracking-widest">
                  {offer.category} OFFER
                </p>
                <h3 className="text-xl font-black mb-3 leading-tight">{offer.title}</h3>
                <div className="bg-gradient-to-r from-accent to-accent-hover text-primary px-4 py-2 rounded-full font-black text-sm inline-block shadow-lg">
                  {offer.discount}
                </div>
              </motion.div>

              {/* Bottom CTA - Slide up on hover */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full bg-white text-primary py-3 rounded-lg font-bold hover:bg-accent hover:text-white transition-all duration-300 shadow-md"
              >
                SHOP NOW →
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Offers;
