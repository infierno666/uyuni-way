import { Star, Clock, Heart } from 'lucide-react';

const TourCard = ({ tour }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">

            {/* IMAGEN Y FAVORITO */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-colors">
                    <Heart size={18} />
                </button>
                <div className="absolute bottom-3 left-3 bg-uyuni-dark/80 text-white text-xs px-2 py-1 rounded backdrop-blur-md flex items-center gap-1">
                    <Clock size={12} /> {tour.duration}
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Encabezado */}
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-uyuni-blue uppercase tracking-wider">{tour.company}</span>
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star size={14} fill="currentColor" />
                        <span className="text-gray-700 text-sm font-bold">{tour.rating}</span>
                        <span className="text-gray-400 text-xs">({tour.reviews})</span>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-uyuni-blue transition-colors">
                    {tour.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tour.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer de la tarjeta: Precio y Botón */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs">Desde</p>
                        <p className="text-xl font-bold text-uyuni-dark">
                            {tour.price} <span className="text-sm font-normal">{tour.currency}</span>
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-uyuni-dark text-white text-sm font-medium rounded-lg hover:bg-uyuni-blue transition-colors">
                        Ver Detalle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TourCard;