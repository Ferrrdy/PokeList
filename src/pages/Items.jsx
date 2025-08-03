import { pokemonItems } from '../data/data';
import { motion } from 'framer-motion';

const Items = () => {
  return (
    <div className="container mx-auto mt-5 p-6">
      <motion.h1 
        className="text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Daftar Item <span className='block'>Pokemon</span>
      </motion.h1>

      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {pokemonItems.map(item => (
          <motion.div 
            key={item.id} 
            className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={item.sprite} 
              alt={item.name} 
              className="w-16 h-16 mx-auto mb-3" 
            />
            <h2 className="text-lg font-semibold text-center">{item.name}</h2>
            <p className="text-sm text-gray-600 text-center">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Items;
