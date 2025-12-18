import { useState } from 'react';
import { X, Loader2, Send } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'General', // Valor por defecto
    content: ''
  });

  const categories = ["Logística", "Fotografía", "Tours", "Hospedaje", "General"];

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Debes iniciar sesión");

    setLoading(true);

    try {
      // 1. Generamos un resumen automático (excerpt) de los primeros 150 caracteres
      const excerpt = formData.content.length > 150 
        ? formData.content.substring(0, 150) + '...'
        : formData.content;

      // 2. Insertar en Supabase
      const { error } = await supabase.from('posts').insert([
        {
          title: formData.title,
          content: formData.content,
          category: formData.category,
          user_id: user.id, // Vinculamos al usuario actual
          excerpt: excerpt,
          views: 0
        }
      ]);

      if (error) throw error;

      // 3. Limpiar y cerrar
      setFormData({ title: '', category: 'General', content: '' });
      onPostCreated(); // Avisamos al padre para que recargue la lista
      onClose(); // Cerramos el modal

    } catch (error) {
      console.error("Error al publicar:", error);
      alert("Hubo un error al publicar tu post. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header del Modal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800">Crear Nueva Discusión</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título del tema</label>
            <input
              type="text"
              required
              placeholder="Ej: ¿Cuál es la mejor agencia para el tour de 3 días?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Contenido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tu consulta o experiencia</label>
            <textarea
              required
              rows="6"
              placeholder="Escribe aquí los detalles..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            ></textarea>
          </div>

          {/* Footer / Botones */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  Publicando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Publicar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;