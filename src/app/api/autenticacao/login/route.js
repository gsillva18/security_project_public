
import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const { nome, senha } = await request.json( )

    const client = await pool.connect()
    const result = await client.query(
      'SELECT * FROM consumidor WHERE nome = $1 AND senha = $2',
      [nome, senha]
    )

    const user = result.rows[0]

    return NextResponse.json(
      { id: user.id, nome: user.nome },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erro ao logar consumidor:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


