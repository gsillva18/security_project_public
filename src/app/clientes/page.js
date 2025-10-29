'use client'

import { useState, useEffect } from 'react'

import ClienteForm from '../components/ClienteForm'
import ClienteList from '../components/ClienteList'

export default function Home() {
    const [clientes, setClientes] = useState([])

    useEffect(() => {       
        fetchClientes()
    }, [])

    const fetchClientes = async () => {
        const response = await fetch('/api/agendamento') 
        const data = await response.json()
        console.log("Dados recebidos da API:", data)
        setClientes(data)
  
}

    const addCliente = async (cliente) => {
        const response = await fetch('/api/agendamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        })
        if (response.ok) {
            fetchClientes()
        }
    }

    const deleteCliente = async (id) => {
        const response = await fetch(`/api/agendamento/${id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            fetchClientes()
        }
    }

    return (
        <div>
            <h1>Gerenciamento de Clientes</h1>
            <ClienteForm onAddCliente={addCliente} />
            <ClienteList clientes={clientes} onDeleteCliente={deleteCliente} />
        </div>
    )
}   




