'use client'
import { useState } from 'react'
import ClienteForm from '../components/ClienteForm'
import { useAuth } from '../context/AuthContext'
import style from './page.module.css'

export default function Page() {
  const { usuarioLogado } = useAuth()
  

  const handleAddAgendamento = async ({ id_servico, datahora }) => {
    if (!usuarioLogado) {
      alert('Usuário não logado')
      return
    }

    try {
      const res = await fetch('/api/agendamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consumidor_id: usuarioLogado.id,
          id_servico,
          datahora
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erro ao salvar agendamento')
      alert(`Agendamento criado com sucesso para o dia ${datahora}`)
    } catch (err) {
      console.error(err)
      alert('Erro ao salvar agendamento')
    }
  }

  return (
    <div>
      <h1 className={style.h1}>Agendamento</h1>
      <ClienteForm onAddAgendamento={handleAddAgendamento} />
      
    </div>
  )
}
