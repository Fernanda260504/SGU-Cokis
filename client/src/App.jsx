import { useEffect, useState } from "react";
import UsuarioController from "./modules/test/test.controller.js";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombreCompleto: "",
    correo: "",
    telefono: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  // Cargar usuarios al inicio
  const loadUsuarios = async () => {
    // Nota: Asume que UsuarioController.getAll() devuelve una promesa
    const data = await UsuarioController.getAll(); 
    setUsuarios(data);
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createUsuario = async () => {
    // Nota: Asume que UsuarioController.create() es una función asíncrona
    await UsuarioController.create(form);
    resetForm();
    loadUsuarios();
  };

  const updateUsuario = async () => {
    // Nota: Asume que UsuarioController.update() es una función asíncrona
    await UsuarioController.update(form.id, form);
    resetForm();
    setIsEditing(false);
    loadUsuarios();
  };

  const deleteUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
        // Nota: Asume que UsuarioController.delete() es una función asíncrona
        await UsuarioController.delete(id);
        loadUsuarios();
    }
  };

  const resetForm = () => {
    setForm({ id: null, nombreCompleto: "", correo: "", telefono: "" });
  };

  const handleEdit = (usuario) => {
    setForm(usuario);
    setIsEditing(true);
  };

  return (
    <>
      {/* 🚢 Navbar con fondo primario y sombra */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a href="#" className="navbar-brand fw-bold text-white fs-4">
            <i className="bi bi-person-badge-fill me-2"></i>ADJ-Demo | Gestión de Usuarios
          </a>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          {/* Columna para el Formulario (4/12 del ancho en pantallas grandes) */}
          <div className="col-lg-4 mb-4">
            {/* 📝 FORM: Tarjeta con borde temático y sombra */}
            <div className={`card p-4 shadow-lg ${isEditing ? 'border-primary' : 'border-success'}`}>
              <h4 className={`card-title text-center mb-4 ${isEditing ? 'text-primary' : 'text-success'}`}>
                <i className={`bi ${isEditing ? 'bi-pencil-square' : 'bi-person-plus-fill'} me-2`}></i>
                {isEditing ? "Editar Usuario" : "Registrar Usuario"}
              </h4>
              <hr />

              {/* Input: Nombre completo */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="nombreCompleto"
                  placeholder="👤 Nombre completo"
                  value={form.nombreCompleto}
                  onChange={handleChange}
                />
              </div>

              {/* Input: Correo */}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="correo"
                  placeholder="📧 Correo electrónico"
                  value={form.correo}
                  onChange={handleChange}
                />
              </div>

              {/* Input: Teléfono */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  placeholder="📞 Teléfono"
                  value={form.telefono}
                  onChange={handleChange}
                />
              </div>

              {/* Botones de acción */}
              <div className="d-grid gap-2 mt-3">
                {!isEditing ? (
                  <button className="btn btn-success btn-lg" onClick={createUsuario}>
                    <i className="bi bi-floppy-fill me-2"></i> Registrar
                  </button>
                ) : (
                  <>
                    <button className="btn btn-primary btn-lg" onClick={updateUsuario}>
                      <i className="bi bi-check-circle-fill me-2"></i> Actualizar
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        resetForm();
                        setIsEditing(false);
                      }}
                    >
                      <i className="bi bi-x-circle-fill me-2"></i> Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Columna para la Tabla (8/12 del ancho en pantallas grandes) */}
          <div className="col-lg-8">
            <h2 className="text-primary mb-3">
                <i className="bi bi-people-fill me-2"></i> Lista de Usuarios
            </h2>
            {/* 📊 TABLA: Responsive, con hover, cabecera oscura y sombra */}
            <div className="table-responsive shadow-lg rounded">
                <table className="table table-striped table-hover table-bordered align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Teléfono</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {usuarios?.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">
                          <i className="bi bi-info-circle-fill me-2"></i> No hay usuarios registrados.
                        </td>
                      </tr>
                    ) : (
                      usuarios.map((u) => (
                        <tr key={u.id}>
                          <td><span className="badge bg-secondary">{u.id}</span></td>
                          <td>{u.nombreCompleto}</td>
                          <td>{u.correo}</td>
                          <td>{u.telefono}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-warning btn-sm me-2 text-white"
                              onClick={() => handleEdit(u)}
                            >
                              <i className="bi bi-pencil-fill"></i> Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteUsuario(u.id)}
                            >
                              <i className="bi bi-trash-fill"></i> Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;