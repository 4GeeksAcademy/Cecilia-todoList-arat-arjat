import React, { useState } from 'react'
import { useEffect } from 'react'

const TodoList = () => {
    const [list, setList] = useState("");
    const [toDo, setToDo] = useState([{}]);
    const crearUsuario = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/aratarjat", {
                method: "POST",
                body: JSON.stringify([]),
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    const obtnenerTareas = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/aratarjat")
            const data = await response.json()
            console.log(data.todos)
            setToDo(data.todos)
        } catch (error) {
            console.log(error)
        }
    }

    const actualizarTareas = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/aratarjat", {
                method: "PUT",
                body: JSON.stringify(toDo),
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    const guardarTarea = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/aratarjat", {
                method: "PUT",
                body: JSON.stringify(toDo),
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        crearUsuario()
        obtnenerTareas()
    }, []) // se ejecuta una solo vez, posterior a cargar el componente. 

    useEffect(() => {
        actualizarTareas()
    }, [toDo]) // no se ejecuta una solo vez, sino cada vez que haya un cambio en la lista de tareas. 

    const funcionDeBorrado = (value) => {
        const copiaToDo = [...toDo]
        let arregloFiltrado = copiaToDo.filter((tarea) => tarea.value !== value)
        console.log("este es tu arreglo despues de borrado", arregloFiltrado)
        setToDo(arregloFiltrado)
    }
    return (
        <div>
            <ul>
                <input type="text"
                    onChange={(e) => {
                        setList(e.target.value)
                    }}

                    value={list}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {

                            setToDo([...toDo, { "label": list, "done": false }])
                            setList(" ")
                            console.log(toDo)
                        }
                    }
                    }
                    placeholder='things to do' />
                {toDo.map((item, index) =>

                    <li id={index} key={index}>
                        {item.label}
                        <i className="fa-solid fa-x"
                            onClick={(event) => {
                                { funcionDeBorrado(item.value) }
                                console.log("hiciste click en la tarea con valor", item.value)
                            }}>
                        </i>
                    </li>

                )}
            </ul>
            <div>{toDo.length} task</div>
        </div>
    )
}

export default TodoList