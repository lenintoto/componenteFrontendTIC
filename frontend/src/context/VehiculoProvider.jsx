import axios from "axios";
import { createContext, useState } from "react";

const VehiculosContext = createContext()

const VehiculoProvider = ({ children }) => {
    const [modal, setModal] = useState(false)
    const [datosvehiculo, setDatosvehiculo] = useState([])
    const handleModal = () => {
        setModal(!modal)
    }

    const registrarVehiculo = async (datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculo/crear`//Agregar la ruta del back
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, datos, options)
            console.log(respuesta)
            setDatosvehiculo([respuesta.data?.vehiculo, ...datosvehiculo])
        } catch (error) {
            console.log(error);
        }
    }
    const actualizarVehiculo = async (id, form) => {
        try {
            const confirmarAccion = confirm("Esta seguro de actualizar este vehículo?")
            if (confirmarAccion) {
                const token = localStorage.getItem("token")
                const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculo/actualizar/${id}`//Agregar la ruta del back
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }

                const respuesta = await axios.put(url, form, headers)
                const vehiculoActualizado = datosvehiculo.filter(vehiculo => vehiculo._id)
                setDatosreserva(vehiculoActualizado)
                console.log(respuesta)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const eliminarVehiculo = async (id) => {
        try {
            const confirmarAccion = confirm("Esta seguro de eliminar este vehiculo?")
            if (confirmarAccion) {
                const token = localStorage.getItem("token")
                const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculo/eliminar/${id}`//Agregar ruta del back
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const respuesta = await axios.delete(url, options)
                console.log(respuesta)
                const vehiculoEliminado = datosvehiculo.filter(
                    vehiculo => vehiculo._id !== id
                )
                setDatosclientes(vehiculoEliminado)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(<VehiculosContext.Provider
    value={{
        modal,
        setModal,
        handleModal,
        datosvehiculo,
        setDatosvehiculo,
        registrarVehiculo,
        actualizarVehiculo,
        eliminarVehiculo
    }}>{children}
    </VehiculosContext.Provider>)
}
export {VehiculoProvider}

export default VehiculosContext