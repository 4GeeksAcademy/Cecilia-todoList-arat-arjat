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

    const guardarTarea = async () => {
        const tarea = {
            label: list,
            is_done: false
        }
        try {
            await fetch("https://playground.4geeks.com/todo/todos/aratarjat", {
                method: "POST",
                body: JSON.stringify(tarea),
                headers: { "Content-Type": "application/json" }
            })
            obtnenerTareas()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        crearUsuario()
        obtnenerTareas()
    }, []) // se ejecuta una solo vez, posterior a cargar el componente. 


    const funcionDeBorrado = async (e, id) => {
        e.preventDefault()
        console.log(id)
        try {
            await fetch("https://playground.4geeks.com/todo/todos/" + id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })
            obtnenerTareas()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <ul>
                <input 
                    className='mb-4'
                    style={{height: "60px", borderRadius: "5px"}}
                    type="text"
                    onChange={(e) => setList(e.target.value)}
                    value={list}
                    onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setList("")
                                guardarTarea()
                            }
                        }
                    }
                    placeholder='Things to do' />


                {toDo.map((item, index) =>
                    <li 
                        id={index} 
                        key={index}
                        className='mb-2'
                    >
                        {item.label}
                        <i className="fa-solid fa-trash float-end"
                            onClick={(e) => funcionDeBorrado(e, item.id) }>
                        </i>
                    </li>

                )}
            </ul>
            <div>
                <p className='' style={{color: "red"}}>
                {toDo.length} tasks pending 
                </p>
                </div>
        </div>
    )
}

export default TodoList