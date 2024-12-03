import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ModalActualizarContraseña = ({ isOpen, onClose, onUpdate, role }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdate = () => {
    if (newPassword === confirmPassword) {
      onUpdate(oldPassword, newPassword, confirmPassword);
      alert("Contraseña actualizada con éxito");
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose();
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Actualizar Contraseña</h2>
        <div className="mb-4 relative">
          <input 
            type={showOldPassword ? "text" : "password"} 
            placeholder="Contraseña Antigua" 
            value={oldPassword} 
            onChange={(e) => setOldPassword(e.target.value)} 
            className="border p-2 w-full pr-10"
          />
          <button 
            onClick={() => setShowOldPassword(!showOldPassword)} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="mb-4 relative">
          <input 
            type={showNewPassword ? "text" : "password"} 
            placeholder="Nueva Contraseña" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            className="border p-2 w-full pr-10"
          />
          <button 
            onClick={() => setShowNewPassword(!showNewPassword)} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="mb-4 relative">
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Confirmar Contraseña" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="border p-2 w-full pr-10"
          />
          <button 
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button 
          onClick={handleUpdate} 
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Actualizar
        </button>
        <button 
          onClick={onClose} 
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalActualizarContraseña; 