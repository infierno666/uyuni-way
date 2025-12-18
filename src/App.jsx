import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ForumHome from './pages/ForumHome';
import Login from './pages/Login';           // <--- Importar Login
import { AuthProvider } from './context/AuthContext'; // <--- Importar Contexto
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <AuthProvider> {/* <--- Envolver TODO aquí */}
      <div className="font-sans flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/foro" element={<ForumHome />} />
            <Route path="/login" element={<Login />} /> {/* <--- Nueva Ruta */}
            <Route path="/foro/:id" element={<PostDetail />} /> {/* <--- 2. Nueva Ruta Dinámica */}
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App;