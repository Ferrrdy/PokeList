import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPokemonList } from '../services/api';

const Home = () => {
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonList();
        setAllPokemon(data);
      } catch (error) {
        console.error("Gagal memuat data Pokémon:", error);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4">
      {/* Header */}
      <motion.nav 
        className="flex flex-col gap-4 sm:gap-6 md:flex-row md:justify-between md:items-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-left">
          <h1 className="font-semibold text-xl">Hai.</h1>
          <h1 className="font-bold text-5xl">Mau Cari Apa?</h1>
        </div>
      </motion.nav>

      {/* Card Section */}
      <section className="mt-10">
        <div className="mx-auto">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8 w-full">
            {/* Card PokeDex */}
            <motion.div 
              className="relative flex flex-col justify-between rounded-xl bg-[#bcb6ff] p-8 shadow-xl xl:row-span-2 w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-black">PokeDex</h3>
                <p className="mt-2 text-base text-slate-800">
                  Lihat berbagai koleksi Pokemon yang tersedia.
                </p>
              </div>
              <div className="relative mt-5 h-80">
                <img
                  src="https://th.bing.com/th/id/R.fece8053ed2c83b8abc059ec15d8eacc?rik=%2bAdZf4aRyIC1SQ&riu=http%3a%2f%2fmaulik-kamdar.com%2fwp-content%2fuploads%2f2018%2f02%2fpokemon.jpg&ehk=%2bXPEmU8i9XX%2fhcE3BUbPwMDlrL%2fhHo02EL8T0F5809U%3d&risl=&pid=ImgRaw&r=0"
                  alt="Pokemon Collection"
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Card Pokemon */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="w-full"
            >
              <Link 
                to="/pokemon" 
                className="relative flex items-center justify-between gap-x-8 rounded-xl bg-[#a9fff7] p-8 hover:bg-cyan-300 transition-colors cursor-pointer h-full"
              >
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Tipe Pokemon</h3>
                  <p className="mt-1 text-base text-gray-600">
                    Pelajari kekuatan dan kelemahan setiap tipe.
                  </p>
                </div>
                <ArrowRight className="h-8 w-8 text-gray-500 flex-shrink-0" />
              </Link>
            </motion.div>

            {/* Card Items */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="w-full"
            >
              <Link 
                to="/items" 
                className="relative flex items-center justify-between gap-x-8 rounded-xl bg-[#b8e1ff] p-8 hover:bg-blue-300 transition-colors cursor-pointer h-full"
              >
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Daftar Item</h3>
                  <p className="mt-1 text-base text-gray-600">
                    Temukan item-item berguna di dunia Pokémon.
                  </p>
                </div>
                <ArrowRight className="h-8 w-8 text-gray-500 flex-shrink-0" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistik */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-20 text-center my-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div whileHover={{ scale: 1.1 }}>
          <h2 className="text-5xl font-extrabold text-purple-700">110+</h2>
          <p className="text-xl font-semibold text-black">Pokemon Tersedia</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <h2 className="text-5xl font-extrabold text-purple-700">40+</h2>
          <p className="text-xl font-semibold text-black">Item Koleksi</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
