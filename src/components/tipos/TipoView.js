import React, { useEffect, useState } from "react"
import { getTiposEquipos, crearTipos } from '../../services/tipoEquipoService';

export const TipoView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [tipos, setTipos] = useState([]);
  const { nombre = '', estado = '' } = valoresForm;

  const listarTipos = async () => {
    try {
      const resp = await getTiposEquipos();
      setTipos(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarTipos();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearTipos = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      const resp = await crearTipos(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });
      listarTipos();
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className="container-fluid">
      <form onSubmit={(e) => handleCrearTipos(e)}>
        <div className="mb-3">
          <label className="form-label">Tipo Nombre</label>
          <input required name="nombre" value={nombre} type="text" className="form-control"
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
            tipos.map(tipo => {
              return <tr>
                <td>{tipo.nombre}</td>
                <td>{tipo.estado}</td>
              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  )
}

