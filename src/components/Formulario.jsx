import Mensajes from "./Mensajes"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react'

// setEstado: Llamar dentro del componente: con parentesis porque es una desestructuración
export const Formulario = ({setEstado,idMetro}) => {
    // useState va siempre antes del return
    // Para manejar mensajes de error
    const [error, setError] = useState(false)
    // Para mensaje de éxito
    const [mensaje, setMensaje] = useState(false)
    // Formulario
    const [form, setform] = useState({
        nombre:"",
        sector:"",
        salida:"",
        llegada:"",
        maquinista:"",
        detalles:""
    })

    useEffect(() => {
        if(idMetro)
        {
            (async function (idMetro) {
                try {
                    const respuesta = await (await fetch(`https://64db039f593f57e435b057de.mockapi.io/metro/metro/${idMetro}`)).json()
                    const {id,nombre,sector,salida,llegada,maquinista,detalles} = respuesta
                    setform({
                        ...form,
                        nombre,
                        sector,
                        salida,
                        llegada,
                        maquinista,
                        detalles,
                                                id
                    })
                }
                catch (error) {
                    console.log(error);
                }
            })(idMetro)
        }
    }, [idMetro])

    //los elementos que estan inicialmente vacíos se van completando con el ingreso de datos del usuario
    // en nombre, sector, salida ......
    const handleChange = (e) => { 
        setform({
            ...form, // ... : realiza una copia del objeto
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = async(e)=>{
        //impide que se pierdan los datos con la actualización de página
        e.preventDefault()
        // validadción de campos vacíos
        if (Object.values(form).includes("") || Object.entries(form).length === 0)
        {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 1000);
            return
        }
        try {
            if(form.id){
                const url = `https://64db039f593f57e435b057de.mockapi.io/metro/metro/${form.id}`
                await fetch(url,{
                    method:'PUT',
                    body:JSON.stringify(form),
                    headers:{'Content-Type':'application/json'}
                })
                setEstado(true)
                setform({})
								setTimeout(() => {
                    setEstado(false)
                    setform({})
                }, 1000)
            }
            else{
                const url ="https://64db039f593f57e435b057de.mockapi.io/metro/metro"
				form.id = uuidv4()
                await fetch(url,{
                    // Método para crear un nuevo recurso
                    method:'POST',
                    // Convierte el formulario en JSON
                    body:JSON.stringify(form),
                    headers:{'Content-Type':'application/json'}
                })
                setMensaje(true)
			    setEstado(true)
                setTimeout(() => {
                    setMensaje(false)
				    setEstado(false)
                    setform({})
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        // Evento y nombre del evento
        <form onSubmit={handleSubmit}>
            {error && <Mensajes tipo="bg-red-900">"Existen campos vacíos"</Mensajes>}
	        {mensaje && <Mensajes tipo="bg-green-900">"Registro exitoso"</Mensajes>} 
            
            <Mensajes tipo={"bg-red-900"}>validar campos</Mensajes>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre de la ruta'
                    name='nombre'
                    value={form.nombre || ""} 
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='sector'
                    className='text-gray-700 uppercase font-bold text-sm'>Sector: </label>
                <input
                    id='sector'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='sector de la ruta'
                    name='sector'
                    value={form.sector || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='salida'
                    className='text-gray-700 uppercase font-bold text-sm'>Punto de salida: </label>
                <input
                    id='salida'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='punto de salida'
                    name='salida'
                    value={form.salida || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='llegada'
                    className='text-gray-700 uppercase font-bold text-sm'>Punto de llegada: </label>
                <input
                    id='llegada'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='punto de llegada'
                    name='llegada'
                    value={form.llegada || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='maquinista'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del maquinista: </label>
                <input
                    id='maquinista'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del maquinista'
                    name='maquinista'
                    value={form.maquinista || ""}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='detalles'
                    className='text-gray-700 uppercase font-bold text-sm'>Detalles: </label>
                <textarea
                    id='detalles'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    name='detalles'
                    value={form.detalles || ""}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className='bg-sky-900 w-full p-3 
              text-white uppercase font-bold rounded-lg 
              hover:bg-red-900 cursor-pointer transition-all'
              value={form.id ? "Actualizar ruta" : "Registrar ruta"} />
        </form>
    )
}
