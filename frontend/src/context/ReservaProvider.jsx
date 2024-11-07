import axios from "axios";
import { createContext, useState } from "react";

const ReservasContext = createContext()

const ReservaProvider = ({ children }) => {
    const [modal, setModal] = useState(false)
    const [datosreserva, setDatosreserva] = useState([])
    const handleModal = () => {
        setModal(!modal)
    }

    const registrarReserva = async (datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}`//Agregar la ruta del back
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, datos, options)
            console.log(respuesta)
            setDatosreserva([respuesta.data?.reserva, ...datosreserva])
        } catch (error) {
            console.log(error);
        }
    }
    const actualizarReserva = async (id, form) => {
        try {
            const confirmarAccion = confirm("Esta seguro de actualizar esta reserva?")
            if (confirmarAccion) {
                const token = localStorage.getItem("token")
                const url = `${import.meta.env.VITE_BACKEND_URL}`//Agregar la ruta del back
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }

                const respuesta = await axios.put(url, form, headers)
                const reservaActualizado = datosreserva.filter(reserva => reserva._id)
                setDatosreserva(reservaActualizado)
                console.log(respuesta)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const eliminarReserva = async (id) => {
        try {
            const confirmarAccion = confirm("Esta seguro de eliminar esta reserva?")
            if (confirmarAccion) {
                const token = localStorage.getItem("token")
                const url = `${import.meta.env.VITE_BACKEND_URL}`//Agregar del back
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const respuesta = await axios.delete(url, options)
                console.log(respuesta)
                const reservaEliminado = datosreserva.filter(
                    reserva => reserva._id !== id
                )
                setDatosclientes(reservaEliminado)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(<ReservasContext.Provider
    value={{
        modal,
        setModal,
        handleModal,
        datosreserva,
        setDatosreserva,
        registrarReserva,
        actualizarReserva,
        eliminarReserva
    }}>{children}
    </ReservasContext.Provider>)
}
export {ReservaProvider}

export default ReservasContext