import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="font-sans flex flex-col min-h-screen">
      {/* Navbar siempre visible arriba */}
      <Navbar />

      {/* Contenido dinámico según la ruta */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* En el futuro agregaremos más rutas aquí: 
              <Route path="/tours/:id" element={<TourDetail />} /> 
          */}
        </Routes>
      </main>

      {/* Footer siempre visible abajo */}
      <Footer />
    </div>
  )
}

export default App;