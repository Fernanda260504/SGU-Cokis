const UsuarioController = {};
const ENV = import.meta.env;

// API final EJEMPLO:
// http://localhost:8081/api/users
const API_URL = `http://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;

// GET: Obtener todos los usuarios
UsuarioController.getAll = async () => {
  try {
    const response = await fetch(API_URL);
    
    // Si la respuesta no es exitosa (ej: 404, 500), devolvemos un array vacío
    if (!response.ok) {
        console.error("Respuesta del servidor no exitosa. Estado:", response.status);
        return [];
    }
    
    // Intentamos parsear el JSON
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    // 🚨 COORECCIÓN: Siempre devolvemos un array vacío para evitar el error 'map' en el frontend.
    return []; 
  }
};

// POST: Crear usuario
UsuarioController.create = async (usuario) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });

    return await response.json();
  } catch (error) {
    console.error("Error al crear usuario:", error);
  }
};

// PUT: Actualizar usuario
UsuarioController.update = async (id, usuario) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
};

// DELETE: Eliminar usuario
UsuarioController.remove = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
  }
};

export default UsuarioController;