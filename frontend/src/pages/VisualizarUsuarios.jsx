import React from 'react';
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";

const ReservasPage = () => {
  return (
    <div className="flex flex-col h-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Reservas</h1>
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="bg-gray-200 p-4">
            <div className="alert error">No existen registros</div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Descargar
          </button>
        </div>

        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-gray-800 text-slate-400">
            <tr>
              <th className="p-2">N°</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Vehiculo</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-300 text-center">
              <td>1</td>
              <td>Cliente</td>
              <td>Vehiculo</td>
              <td>01/01/2024</td>
              <td>Descripción de la reserva</td>
              <td className="py-2 text-center">
                <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" />
                <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" />
                <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer className="py-4 mt-auto">
        <div className="text-center text-sm text-gray-600">
          &copy; Your Website 2023
        </div>
      </footer>
    </div>

  );
};

export default ReservasPage;