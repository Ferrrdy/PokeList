import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getPokemonList } from '../services/api';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import { Search } from 'lucide-react';

// Animasi container dan card
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Tipe-tipe Pokémon untuk filter
const pokemonTypes = [
  'all', 'grass', 'fire', 'water', 'bug', 'normal', 'poison',
  'electric', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon'
];

const Pokemon = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Ambil data Pokémon saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonList();
        setAllPokemon(data);
      } catch (error) {
        console.error("Gagal memuat data Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  // Filter Pokémon berdasarkan tipe dan pencarian nama
  const filteredPokemon = useMemo(() => {
    return allPokemon
      .filter(pokemon => {
        if (selectedType === 'all') return true;
        return pokemon.types.some(t => t.type.name === selectedType);
      })
      .filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [allPokemon, searchTerm, selectedType]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Header halaman */}
      <motion.div 
        className="text-left mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-5xl font-extrabold text-gray-900 tracking-tighter">
          Pokedex Direktori
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-500">
          Direktori lengkap untuk Pokémon generasi pertama. Cari dan pelajari detailnya.
        </p>
      </motion.div>

      {/* Search dan Filter */}
      <div className="mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari Pokémon berdasarkan nama..."
            className="w-full p-3 pl-12 bg-white text-gray-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {pokemonTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 text-sm font-semibold rounded-full capitalize transition-colors duration-200 ${
                selectedType === type 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* List Pokémon */}
      {loading ? (
        <div className="flex justify-center mt-16">
          <Spinner />
        </div>
      ) : filteredPokemon.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPokemon.map((pokemon) => (
            <motion.div key={pokemon.id} variants={cardVariants}>
              <Card pokemon={pokemon} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center text-gray-500 mt-16">
          <h3 className="text-2xl font-bold">Tidak Ada Pokémon yang Cocok</h3>
          <p className="mt-2">Coba ubah filter atau kata kunci pencarian Anda.</p>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
