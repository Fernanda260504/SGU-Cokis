const UsuarioController = {};
const ENV = import.meta.env;

const API_URL = `http://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;

// ----------------- GET: Obtener todos los usuarios -----------------
UsuarioController.getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/usuarios`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
};

// ----------------- POST: Crear usuario -----------------
UsuarioController.create = async (usuario) => {
  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });

    return await response.json();
  } catch (error) {
    console.error("Error al crear usuario:", error);
  }
};

// ----------------- PUT: Actualizar usuario -----------------
UsuarioController.update = async (id, usuario) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
};

// ----------------- DELETE: Eliminar usuario -----------------
UsuarioController.remove = async (id) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
  }
};

export default UsuarioController;
