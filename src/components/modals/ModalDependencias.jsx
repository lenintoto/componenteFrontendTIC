import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import AuthContext from '../../context/AuthProvider';
import Draggable from 'react-draggable';

const DependenciaModal = ({ isOpen, onClose, dependencias, refreshDependencias }) => {
    const { auth } = useContext(AuthContext);
    const [newDependencia, setNewDependencia] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleAddDependencia = async (e) => {
        e.preventDefault();
        if (!newDependencia.trim()) {
            setError('El nombre de la dependencia es obligatorio');
            return;
        }
        
        const endpoint = auth.rol === 'administrador'
            ? `${import.meta.env.VITE_BACKEND_URL}/dependencia/agregar`
            : null;

        if (!endpoint) {
            setError('No tiene permiso para agregar dependencias');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token no encontrado. Por favor, inicie sesión nuevamente.');
                return;
            }

            const response = await axios.post(endpoint, {
                nombre: newDependencia,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setNewDependencia('');
            setError('');
            refreshDependencias();
            alert(response.data.msg);
        } catch (err) {
            setError(err.response?.data?.msg || 'Error al agregar la dependencia');
        }
    };

    const handleDeleteDependencia = async (id) => {
        if (!auth.rol === 'administrador') {
            setError('No tiene permiso para eliminar dependencias');
            return;
        }

        const confirmDelete = window.confirm('¿Está seguro de que desea eliminar esta dependencia?');
        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token no encontrado. Por favor, inicie sesión nuevamente.');
                return;
            }

            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/dependencia/eliminar/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setError('');
            refreshDependencias();
            alert(response.data.msg);
        } catch (err) {
            setError(err.response?.data?.msg || 'Error al eliminar la dependencia');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <Draggable
                handle=".modal-header"
                bounds="parent"
            >
                <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
                    <div className="modal-header p-4 bg-gray-200 rounded-t-lg flex justify-between items-center cursor-move">
                        <h2 className="text-2xl font-bold">Gestión de Dependencias</h2>
                        <button 
                            onClick={onClose} 
                            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                        >
                            ×
                        </button>
                    </div>
                    <div className="overflow-y-auto max-h-60 mb-4">
                        <ul>
                            {dependencias.map((dep) => (
                                <li key={dep._id} className="flex justify-between items-center">
                                    {dep.nombre}
                                    {auth.rol === 'administrador' && (
                                        <button
                                            onClick={() => handleDeleteDependencia(dep._id)}
                                            className="text-red-500 hover:text-red-700 ml-2"
                                        >
                                            <MdDelete className="h-6 w-6" />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {auth.rol === 'administrador' && (
                        <form onSubmit={handleAddDependencia} className="mt-4">
                            <input
                                type="text"
                                value={newDependencia}
                                onChange={(e) => setNewDependencia(e.target.value)}
                                placeholder="Nueva Dependencia"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                            <button type="submit" className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg">
                                Agregar
                            </button>
                        </form>
                    )}
                </div>
            </Draggable>
        </div>
    );
};

export default DependenciaModal;
