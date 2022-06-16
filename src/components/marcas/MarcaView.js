import React, { useEffect, useState } from 'react'
import { getMarcas, crearMarca } from '../../services/marcaService';

export const MarcaView = () => {
  const [valoresForm, setValoresForm] = useState({});
  const [marcas, setMarcas] = useState([]);
  const { nombre = '', estado = '' } = valoresForm;

  const listarMarcas = async () => {
    try {
      const resp = await getMarcas();
      setMarcas(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarMarcas();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value }); //spread
  }
  const handleCrearMarca = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      const resp = await crearMarca(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });
      listarMarcas();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearMarca(e)} >
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input name='nombre' required value={nombre} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select name='estado' required value={estado} className="form-select" onChange={(e) => handleOnChange(e)}>
            <option selected value="">--Seleccione--</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className='row'>
          <div className='col'>
            <button className="btn btn-primary">Crear</button>
          </div>
          {/*boton editar */}
          <div className='col'>
            <button className="btn btn-primary">Editar</button>
          </div>

        </div>
        
      </form>

      {/*tabla para listar marcas */}
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {
            marcas.map(marca => {
              return <tr>
                <td>{marca.nombre}</td>
                <td>{marca.estado}</td>
              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  )
}
