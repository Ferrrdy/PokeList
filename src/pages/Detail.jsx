import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Ruler, Weight, Sparkles } from 'lucide-react';

import { getPokemonDetail } from '../services/api';
import { capitalizeFirstLetter } from '../utils/helpers';
import Spinner from '../components/ui/Spinner';

// Warna untuk setiap tipe Pokémon
const typeColors = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
    grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1',
    ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746',
    steel: '#B7B7CE', fairy: '#D685AD',
};

const Detail = () => {
    const { name } = useParams(); // Ambil nama Pokémon dari URL
    const [pokemon, setPokemon] = useState(null);
    const [species, setSpecies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('about');

    // Ambil data detail Pokémon saat komponen dimuat atau saat nama berubah
    useEffect(() => {
        const fetchAllDetails = async () => {
            setLoading(true);
            try {
                const pokemonData = await getPokemonDetail(name);
                if (pokemonData) {
                    setPokemon(pokemonData);

                    // Ambil data spesies (untuk deskripsi)
                    const speciesData = await axios.get(pokemonData.species.url);
                    setSpecies(speciesData.data);
                }
            } catch (error) {
                console.error("Gagal mengambil detail Pokémon:", error);
                setPokemon(null);
            } finally {
                setLoading(false);
            }
        };
        fetchAllDetails();
        window.scrollTo(0, 0);
    }, [name]);

    if (loading) {
        return <div className="w-full h-screen flex justify-center items-center"><Spinner /></div>;
    }

    if (!pokemon) {
        return <p className="text-center text-red-500 mt-10 text-xl">Gagal memuat detail Pokémon.</p>;
    }

    const primaryType = pokemon.types[0].type.name;
    const bgColor = typeColors[primaryType] || '#A8A77A';
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default;

    // Ambil deskripsi bahasa Inggris
    const flavorText = species?.flavor_text_entries
        .find(entry => entry.language.name === 'en')
        ?.flavor_text.replace(/[\n\f]/g, ' ') || 'No description available.';

    // Tombol navigasi tab
    const TabButton = ({ id, children }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === id ? 'text-white' : 'text-gray-500 hover:bg-gray-200'}`}
            style={{ backgroundColor: activeTab === id ? bgColor : 'transparent' }}
        >
            {children}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="container mx-auto">
                <div className="grid lg:grid-cols-2 min-h-screen">
                    
                    {/* Bagian kiri: Gambar Pokémon */}
                    <motion.div 
                        className="relative flex flex-col justify-center items-center p-8 transition-colors duration-500" 
                        style={{ backgroundColor: bgColor }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <Link 
                            to="/pokemon" 
                            className="absolute top-6 left-6 inline-flex items-center gap-2 text-white font-bold hover:underline opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <ArrowLeft size={20} />
                            Kembali
                        </Link>

                        <motion.img 
                            src={imageUrl} 
                            alt={pokemon.name}
                            className="w-2/3 max-w-sm drop-shadow-2xl"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                        />

                        {/* Nomor Pokémon di background */}
                        <p className="absolute bottom-6 text-8xl font-black text-white opacity-10 tracking-widest">
                            #{pokemon.id.toString().padStart(4, '0')}
                        </p>
                    </motion.div>

                    {/* Bagian kanan: Detail Pokémon */}
                    <motion.div 
                        className="p-8 md:p-12"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        {/* Nama dan tipe Pokémon */}
                        <div className="text-left mb-6">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                                {capitalizeFirstLetter(pokemon.name)}
                            </h1>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {pokemon.types.map(({ type }) => (
                                    <span 
                                        key={type.name} 
                                        className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md" 
                                        style={{ backgroundColor: typeColors[type.name] }}
                                    >
                                        {capitalizeFirstLetter(type.name)}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Tab navigasi */}
                        <div className="bg-gray-100 rounded-lg p-1 flex gap-2 mb-6">
                            <TabButton id="about">Tentang</TabButton>
                            <TabButton id="stats">Statistik Dasar</TabButton>
                        </div>

                        {/* Isi tab */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'about' && (
                                    <div className="space-y-6">
                                        <p className="text-gray-600 leading-relaxed">{flavorText}</p>
                                        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
                                            <div className="font-semibold text-gray-800"><Ruler className="inline mr-2" size={16}/>Tinggi</div>
                                            <div>{pokemon.height / 10} m</div>

                                            <div className="font-semibold text-gray-800"><Weight className="inline mr-2" size={16}/>Berat</div>
                                            <div>{pokemon.weight / 10} kg</div>

                                            <div className="font-semibold text-gray-800"><Sparkles className="inline mr-2" size={16}/>Abilities</div>
                                            <div className="capitalize">{pokemon.abilities.map(a => a.ability.name).join(', ')}</div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'stats' && (
                                    <div className="space-y-4">
                                        {pokemon.stats.map((stat) => (
                                            <div key={stat.stat.name}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        {capitalizeFirstLetter(stat.stat.name.replace('-', ' '))}
                                                    </p>
                                                    <p className="text-sm font-bold">{stat.base_stat}</p>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="h-2 rounded-full" 
                                                        style={{ width: `${(stat.base_stat / 255) * 100}%`, backgroundColor: bgColor }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Detail;
