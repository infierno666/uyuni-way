import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { Menu, X, MapPin, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient'; // <--- NUEVO: Importamos supabase

const Navbar = () => {
    const { user, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // <--- NUEVO: Estado para guardar datos del perfil (foto y nombre)
    const [profile, setProfile] = useState(null);
    
    const location = useLocation();

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Guía del Salar', path: '/' }, 
        { name: 'Tours', path: '/' },         
        { name: 'Comunidad', path: '/foro' }, 
    ];

    // <--- NUEVO: Efecto para cargar el perfil cuando hay usuario
    useEffect(() => {
        const getProfile = async () => {
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('username, avatar_url')
                    .eq('id', user.id)
                    .single();
                
                setProfile(data);
            } else {
                setProfile(null);
            }
        };
        getProfile();
    }, [user]); // Se ejecuta cada vez que 'user' cambia

    // Efecto del scroll (igual que antes)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) setScrolled(true);
            else setScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const useSolidStyle = scrolled || location.pathname !== '/';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            useSolidStyle ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* LOGO */}
                    <Link to="/" className="flex items-center gap-2">
                        <MapPin className={`h-8 w-8 ${useSolidStyle ? 'text-uyuni-blue' : 'text-white'}`} />
                        <span className={`text-2xl font-bold tracking-tighter ${
                            useSolidStyle ? 'text-uyuni-dark' : 'text-white'
                        }`}>
                            Uyuni<span className="text-uyuni-blue">Way</span>
                        </span>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path} 
                                className={`font-medium hover:text-uyuni-blue transition-colors ${
                                    useSolidStyle ? 'text-gray-700' : 'text-white/90'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* --- LÓGICA DE USUARIO ACTUALIZADA --- */}
                        {user ? (
                            <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
                                {/* FOTO DE PERFIL */}
                                {profile?.avatar_url && (
                                    <img 
                                        src={profile.avatar_url} 
                                        alt="Avatar" 
                                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                    />
                                )}

                                {/* NOMBRE DE USUARIO */}
                                <div className="flex flex-col">
                                    <span className={`text-sm font-bold leading-tight ${useSolidStyle ? 'text-gray-800' : 'text-white'}`}>
                                        Hola, {profile?.username || 'Viajero'}
                                    </span>
                                </div>

                                {/* BOTÓN SALIR */}
                                <button 
                                    onClick={() => { setProfile(null); signOut(); }}
                                    className="ml-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all shadow-sm"
                                    title="Cerrar sesión"
                                >
                                    <LogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="bg-uyuni-blue hover:bg-sky-600 text-white px-5 py-2 rounded-full font-medium transition-all flex items-center gap-2">
                                    <UserIcon size={18} />
                                    Ingresar
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className={useSolidStyle ? 'text-gray-800' : 'text-white'}>
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* MOBILE MENU DROPDOWN (Opcional: aquí también podrías poner la foto) */}
            {/* ... */}
        </nav>
    );
};

export default Navbar;