import React from 'react';
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";

const VisualizarUsuarios = () => {
  return (
    <div className="flex flex-col h-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Usuarios</h1>
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="bg-gray-200 p-4">
            <div className="alert error">No existen registros</div>
          </div>
        </div>

        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-gray-800 text-slate-400">
            <tr>
              <th className="p-2">N°</th>
              <th className="p-2">Nombre de usuario</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Apellido</th>
              <th className="p-2">Extensión</th>
              <th className="p-2">Email</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-300 text-center">
              <td>1</td>
              <td>lenig</td>
              <td>Lenin</td>
              <td>Gomez</td>
              <td></td>
              <td>lenin@gmail.com</td>
              <td className="py-2 text-center">
                <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" />
                <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" />
                <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisualizarUsuarios;