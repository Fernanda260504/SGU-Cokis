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
    await UsuarioController.create(form);
    resetForm();
    loadUsuarios();
  };

  const updateUsuario = async () => {
    await UsuarioController.update(form.id, form);
    resetForm();
    setIsEditing(false);
    loadUsuarios();
  };

  const deleteUsuario = async (id) => {
    await UsuarioController.delete(id);
    loadUsuarios();
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">ADJ-Demo</a>
        </div>
      </nav>

      <div className="container mt-5">
        <h2>Gestión de Usuarios</h2>
        <hr />

        {/* FORM */}
        <div className="card p-4 mb-4">
          <h4>{isEditing ? "Editar Usuario" : "Registrar Usuario"}</h4>

          <input
            type="text"
            className="form-control mb-2"
            name="nombreCompleto"
            placeholder="Nombre completo"
            value={form.nombreCompleto}
            onChange={handleChange}
          />

          <input
            type="email"
            className="form-control mb-2"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control mb-2"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
          />

          {!isEditing ? (
            <button className="btn btn-success" onClick={createUsuario}>
              Registrar
            </button>
          ) : (
            <>
              <button className="btn btn-primary me-2" onClick={updateUsuario}>
                Actualizar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  resetForm();
                  setIsEditing(false);
                }}
              >
                Cancelar
              </button>
            </>
          )}
        </div>

        {/* TABLA */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios?.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No hay usuarios</td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombreCompleto}</td>
                  <td>{u.correo}</td>
                  <td>{u.telefono}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(u)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUsuario(u.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </>
  );
}

export default App;
