import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Navbar from './components/layout/Navbar';
import Pokemon from './pages/Pokemon';
import Items from './pages/Items';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/pokemon/:name" element={<Detail />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
