
import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  let client
  try {
    client = await pool.connect()
    const result = await client.query('SELECT * FROM servico ORDER BY nome ASC')
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Erro listando serviços:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    if (client) client.release()
  }
}

