import React from "react";

export const ModalVehiculo = ({ }) => {

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
  <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
    <h2 className="text-lg font-bold mb-4">Auditorio</h2>
    
    <form>
      <div>
        <label for="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre:</label>
        <input
          id="nombre"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Nombre del auditorio"
        />
      </div>
      <div>
        <label for="capacidad" className="text-gray-700 uppercase font-bold text-sm">Capacidad:</label>
        <input
          id="capacidad"
          type="number"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Capacidad del auditorio"
        />
      </div>
      <div>
        <label for="ubicacion" className="text-gray-700 uppercase font-bold text-sm">Ubicación:</label>
        <input
          id="ubicacion"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Ubicación del auditorio"
        />
      </div>
      <div>
        <label for="descripcion" className="text-gray-700 uppercase font-bold text-sm">Descripción:</label>
        <textarea
          id="descripcion"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Descripción del auditorio"
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-gray-600 text-slate-300 uppercase font-bold rounded-lg p-2 hover:bg-gray-900 transition-all"
        >
          Guardar
        </button>
        <button
          type="button"
          className="bg-red-500 text-white uppercase font-bold rounded-lg p-2 hover:bg-red-700 transition-all"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</div>
  );
};