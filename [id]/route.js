import db from "@/lib/db"
import { NextResponse } from 'next/server'
 
 export async function GET(request, { params }) {
  const { id } = params
   const query = `
    SELECT 
       a.datahora,  
       a.nomeservico,
       a.concluido

       FROM agendamento a
    	 where a.consumidorid = ${id}
       ORDER BY a.datahora DESC;
       `;
    try {

     const result = await db.query(query);
     return NextResponse.json(result.rows)
   } catch (error) {
     console.error('Erro listando alunos:', error)
     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
   }
 }