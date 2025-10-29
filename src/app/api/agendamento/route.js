
import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const consumidorId = searchParams.get('consumidorId')

    const client = await pool.connect()
    const result = await client.query(
      `SELECT a.agendamentoid, a.datahora, a.consumidor_id, a.id_servico, s.nome  AS servico
       FROM agendamento a
       JOIN servico s ON a.id_servico = s.id
       WHERE a.consumidor_id = $1
       ORDER BY a.datahora ASC`,
   [consumidorId]
    )
    client.release()
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Erro listando clients:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request) {
  let client
  try {
    const { consumidor_id, id_servico, datahora } = await request.json()

    if (!consumidor_id || !id_servico || !datahora) {
      return NextResponse.json(
        { error: "consumidor_id, id_servico e datahora são obrigatórios" },
        { status: 400 }
      )
    }

    client = await pool.connect()
    await client.query(
      `INSERT INTO agendamento (consumidor_id, id_servico, datahora)
       VALUES ($1, $2, $3)`,
      [consumidor_id, id_servico, datahora]
    )
    return NextResponse.json({ message: "Agendamento criado com sucesso" }, { status: 201 })
  } catch (err) {
    console.error("Erro ao criar agendamento:", err)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  } finally {
    if (client) client.release()
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
    }

    const client = await pool.connect();
    await client.query('DELETE FROM agendamento WHERE agendamentoid = $1', [id]);
    client.release();

    return NextResponse.json({ message: 'Agendamento removido com sucesso' });
  } catch (error) {
    console.error('Erro removendo agendamento:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

 