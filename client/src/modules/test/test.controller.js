const UsuarioController = {};
const ENV = import.meta.env;

const API_URL = `http://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;

// GET: Obtener todos los usuarios
UsuarioController.getAll = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
        console.error("Respuesta del servidor no exitosa. Estado:", response.status);
        return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
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

// ✅ CAMBIA "remove" por "delete"
UsuarioController.delete = async (id) => {
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