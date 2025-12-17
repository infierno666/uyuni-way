import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react'; // Íconos

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detectar scroll para cambiar el fondo
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* LOGO */}
                    <Link to="/" className="flex items-center gap-2">
                        <MapPin className={`h-8 w-8 ${scrolled ? 'text-uyuni-blue' : 'text-white'}`} />
                        <span className={`text-2xl font-bold tracking-tighter ${scrolled ? 'text-uyuni-dark' : 'text-white'
                            }`}>
                            Uyuni<span className="text-uyuni-blue">Way</span>
                        </span>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex space-x-8">
                        {['Inicio', 'Guía del Salar', 'Tours', 'Comunidad'].map((item) => (
                            <Link
                                key={item}
                                to="/"
                                className={`font-medium hover:text-uyuni-blue transition-colors ${scrolled ? 'text-gray-700' : 'text-white/90'
                                    }`}
                            >
                                {item}
                            </Link>
                        ))}
                        <button className="bg-uyuni-blue hover:bg-sky-600 text-white px-5 py-2 rounded-full font-medium transition-all">
                            Planificar Viaje
                        </button>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-gray-800' : 'text-white'}>
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isOpen && (
                <div className="md:hidden bg-white absolute w-full shadow-xl border-t">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {['Inicio', 'Guía del Salar', 'Tours', 'Comunidad'].map((item) => (
                            <Link
                                key={item}
                                to="/"
                                className="block px-3 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <button className="w-full mt-4 bg-uyuni-blue text-white py-3 rounded-lg font-bold">
                            Planificar Viaje
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;