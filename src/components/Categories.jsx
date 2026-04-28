
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { name: 'Electronics', image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/BAU/Page/Revamp/Creatives/Headphones_1x._SY116_CB627349141_.jpg' },
  { name: 'Fashion', image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Flip/AF_PC_379x304._SY304_CB580632617_.jpg' },
  { name: 'Home', image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/HPC/BAU/PC_QC_379x304._SY304_CB567150036_.jpg' },
  { name: 'Beauty', image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/BAU/PC_QC_379x304._SY304_CB567150036_.jpg' }
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 -mt-48 relative z-20">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <motion.div
            key={cat.name}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate(`/shop?category=${cat.name}`)}
            className="bg-white p-6 cursor-pointer shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">{cat.name}</h3>
            <div className="h-64 overflow-hidden mb-4">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm text-blue-600 hover:text-orange-600 hover:underline">Shop now</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
