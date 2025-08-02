📌 PokeList

PokeList adalah aplikasi berbasis **React.js** yang menampilkan daftar Pokémon generasi pertama menggunakan data dari [PokeAPI](https://pokeapi.co/).  
Aplikasi ini menyediakan fitur **pencarian**, **filter berdasarkan tipe Pokémon**, serta halaman **daftar item Pokémon** dengan animasi interaktif.

---

🚀 Tech Stack

- ⚛️ **Frontend:** [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)  
- 🎨 **UI & Styling:** [Tailwind CSS](https://tailwindcss.com/)  
- 🛠 **Routing:** [React Router](https://reactrouter.com/)  
- 🎞 **Animations:** [Framer Motion](https://www.framer.com/motion/)  
- 🖼 **Icons:** [Lucide React](https://lucide.dev/)  
- 🌐 **HTTP Client:** [Axios](https://axios-http.com/)  
- 🔗 **API Source:** [PokeAPI](https://pokeapi.co/)  

---

⚙️ Cara Menjalankan Proyek

1️⃣ Clone repository
```bash
git clone https://github.com/username/pokelist.git
cd pokelist

2️⃣ Install dependencies
npm install

3️⃣ Jalankan aplikasi
npm run dev

📂 Struktur Folder
src/
│── components/       # UI Components (Card, Spinner, dll)
│── pages/            # Halaman utama (Home, Pokemon, Items)
│── services/         # API service
│── data/             # Data statis (items Pokémon)
│── App.jsx           # Root aplikasi
│── main.jsx          # Entry point aplikasi
