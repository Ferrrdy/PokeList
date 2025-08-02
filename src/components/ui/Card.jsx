import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { motion } from 'framer-motion';

// Peta warna yang sama dengan halaman detail untuk konsistensi
const typeColors = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
    grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1',
    ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746',
    steel: '#B7B7CE', fairy: '#D685AD',
};

const Card = ({ pokemon }) => {
    // Pastikan pokemon dan sprites ada sebelum diakses
    if (!pokemon || !pokemon.sprites) {
        return null; // Atau tampilkan kartu skeleton loading
    }
  
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
    const primaryType = pokemon.types[0].type.name;
    const cardColor = typeColors[primaryType] || '#A8A77A';

    return (
        <Link to={`/pokemon/${pokemon.id}`} className="group block outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
            <motion.div 
                className="relative w-full h-full rounded-2xl p-4 overflow-hidden transition-all duration-300"
                style={{ backgroundColor: cardColor }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Background pattern */}
                <div 
                    className="absolute top-0 left-0 w-full h-full opacity-20" 
                    style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='white'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
                        backgroundSize: '20px 20px',
                    }}
                ></div>

                {/* Konten Kartu */}
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white drop-shadow-sm">
                            {capitalizeFirstLetter(pokemon.name)}
                        </h3>
                        <p className="text-sm font-bold text-white opacity-70">
                            #{pokemon.id.toString().padStart(4, '0')}
                        </p>
                    </div>

                    <div className="flex-grow flex justify-between items-end mt-2">
                        {/* Tipe Pokemon */}
                        <div className="flex flex-col gap-1">
                            {pokemon.types.map(({ type }) => (
                                <span key={type.name} className="text-xs font-semibold text-white bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                                    {capitalizeFirstLetter(type.name)}
                                </span>
                            ))}
                        </div>

                        {/* Gambar Pokemon */}
                        <motion.img
                            src={imageUrl}
                            alt={pokemon.name}
                            className="w-24 h-24 object-contain drop-shadow-xl"
                            loading="lazy"
                        />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default Card;
