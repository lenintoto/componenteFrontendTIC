import React, { useState } from 'react';

const CrearReportes = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCompleted(e.target.checked);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Registro de Bienes</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="acta" className="block text-sm font-medium text-gray-700">
            N° de Acta
          </label>
          <input
            type="number"
            name="acta"
            id="acta"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            min="0"
          />
        </div>

        <div>
          <label htmlFor="nombreCatalogo" className="block text-sm font-medium text-gray-700">
            Nombre del Custodio
          </label>
          <input
            type="text"
            name="nombreCatalogo"
            id="nombreCatalogo"
            placeholder="Nombre del custodio que recibe"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
            Fecha de Asignación
          </label>
          <input
            type="date"
            name="fecha"
            id="fecha"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">
            Observaciones
          </label>
          <textarea
            name="observaciones"
            id="observaciones"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="dependencia" className="block text-sm font-medium text-gray-700">
            Dependencia
          </label>
          <select
            name="dependencia"
            id="dependencia"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="">Seleccionar Dependencia</option>
            <option value="Facultad 1">Facultad 1</option>
            <option value="Facultad 2">Facultad 2</option>
          </select>
        </div>

        <div>
          <label htmlFor="cantidadBienes" className="block text-sm font-medium text-gray-700">
            Cantidad de Bienes
          </label>
          <input
            type="number"
            name="cantidadBienes"
            id="cantidadBienes"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            min="0"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="estado"
            id="estado"
            checked={isCompleted}
            onChange={handleCheckboxChange}
            className="mt-1"
          />
          <label htmlFor="estado" className="ml-2 text-sm font-medium text-gray-700">
            Completado
          </label>
        </div>

        <div>
          <label htmlFor="subirArchivos" className="block text-sm font-medium text-gray-700">
            Subir Archivos
          </label>
          <input
            type="file"
            name="subirArchivos"
            id="subirArchivos"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              isCompleted ? 'focus:border-indigo-500' : 'bg-gray-200 cursor-not-allowed'
            }`}
            disabled={!isCompleted}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Crear Reporte
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearReportes;
