import { Calendar, CloudSun, Bus, HeartPulse, ArrowRight } from 'lucide-react';

const features = [
    {
        icon: <Calendar className="w-8 h-8 text-uyuni-blue" />,
        title: "Mejor Época",
        desc: "Enero-Marzo para el efecto espejo. Junio-Agosto para cielos despejados y frío intenso.",
        color: "bg-blue-50"
    },
    {
        icon: <Bus className="w-8 h-8 text-uyuni-earth" />,
        title: "Cómo Llegar",
        desc: "Vuelos directos desde La Paz (1h) o buses nocturnos (10h). También tren desde Oruro.",
        color: "bg-orange-50"
    },
    {
        icon: <HeartPulse className="w-8 h-8 text-red-500" />,
        title: "Altura y Salud",
        desc: "Uyuni está a 3,656 msnm. Aclimatarse es vital. Bebe mucha agua y come ligero.",
        color: "bg-red-50"
    },
    {
        icon: <CloudSun className="w-8 h-8 text-purple-600" />,
        title: "Clima Extremo",
        desc: "El sol es muy fuerte (¡Usa bloqueador!) y las noches son heladas (-5°C a -20°C).",
        color: "bg-purple-50"
    }
];

const InfoGrid = () => {
    return (
        <section className="py-20 bg-uyuni-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ENCABEZADO DE SECCIÓN */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-uyuni-dark mb-4">
                        Planifica tu Aventura
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        El Salar no es solo un destino, es una expedición. Aquí tienes los datos claves para no sufrir imprevistos.
                    </p>
                </div>

                {/* GRID DE TARJETAS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                        >
                            {/* ÍCONO CON FONDO DE COLOR */}
                            <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-uyuni-blue transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 leading-relaxed mb-4">
                                {item.desc}
                            </p>

                            <div className="flex items-center text-uyuni-blue font-semibold text-sm group-hover:gap-2 transition-all">
                                Leer más <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default InfoGrid;