import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';

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

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Manage Dependencias</h2>
                <div className="overflow-y-auto max-h-60 mb-4">
                    <ul>
                        {dependencias.map((dep, index) => (
                            <li key={index}>{dep.nombre}</li>
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
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
                    Close
                </button>
            </div>
        </div>
    );
};

export default DependenciaModal;
