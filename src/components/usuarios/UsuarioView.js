import React, { useEffect, useState } from "react"
import { getUsuarios, crearUsuarios } from '../../services/usuarioService';

export const UsuarioView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const { nombre = '', email = '', estado = '' } = valoresForm;

  const listarUsuarios = async () => {
    try {
      const resp = await getUsuarios();
      setUsuarios(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarUsuarios();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearUsuarios= async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      const resp = await crearUsuarios(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', email: '' ,estado: '' });
      listarUsuarios();
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className="container-fluid">
      <form onSubmit={(e) => handleCrearUsuarios(e)}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input required name="nombre" value={nombre} type="text" className="form-control"
            onChange={(e) => handleOnChange(e)} />
        </div>
        <div className="mb-3">
          <label className="form-label">email</label>
          <input required name="email" value={email} type="text" className="form-control"
            onChange={(e) => handleOnChange(e)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select required name="estado" value={estado} className="form-select"
            onChange={(e) => handleOnChange(e)}>
            <option selected value="">...Seleccione...</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <button className="btn btn-primary">Crear</button>
        <button className="btn btn-primary">Editar</button>
      </form>
      {/*tabla para listar tipos */}
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {
            usuarios.map(usuario => {
              return <tr>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.estado}</td>
              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  )
}

