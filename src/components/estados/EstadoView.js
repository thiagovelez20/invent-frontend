import React, { useEffect, useState } from "react"
import { getEstadosEquipos, crearEstados } from "../../services/estadoEquipoService"

export const EstadoView = () => {

const [ valoresForm, setValoresForm ] = useState({});
const [estados, setEstados] = useState([]);
const { nombre = '', estado = '' } = valoresForm;

const listarEstados = async () => {
  try {
    const resp = await getEstadosEquipos();
    setEstados(resp.data);
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  listarEstados();
}, []);

const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value  });
}

const handleCrearEstados = async (e) => {
e.preventDefault();
console.log(valoresForm);
try {
  const resp = await crearEstados(valoresForm);
  console.log(resp.data);
  setValoresForm({ nombre: '', estado: '' });
  listarEstados();
} catch (error) {
  console.log(error);
  
}
}
  return (
    <div className="container-fluid">
      <form onSubmit={ (e) => handleCrearEstados(e) }>
        <div className="mb-3">
          <label className="form-label">Estado Nombre</label>
          <input required name="nombre" value={nombre} type="text" className="form-control" 
              onChange={ (e) => handleOnChange(e) }/>
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select required name="estado" value={estado} className="form-select" 
              onChange={ (e) => handleOnChange(e) }> 
            <option selected value="">...Seleccione...</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <button className="btn btn-primary">Crear</button>
      </form>
      {/*tabla para listar tipos */}
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {
            estados.map(estado => {
              return <tr>
                <td>{estado.nombre}</td>
                <td>{estado.estado}</td>
              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  )
}


