import pool from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // É necessário colocar a biblioteac para hashear a senha


export async function POST(request) {
  try {
    //const { nome, email, senha } = await request.json();
    const { nome, email, senha, role = "cliente" } = await request.json();
    console.log("Recebi do frontend:", nome, email, senha);

    //validação de segurança(campos vazios)
    if (!nome || !email || !senha) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const client = await pool.connect();

    //validação de segurança(ususário já existente)
    const existe = await client.query(
      "SELECT id FROM consumidor WHERE email = $1",
      [email]
    );
    if (existe.rowCount > 0) {
      client.release();
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
    }

    //Criptografia da senha 
    const senhaHash = await bcrypt.hash(senha, 12); // custo 12 é bom, como visto anteriormente

    //inserindo/cadastrando novo usuário

    // await client.query(
    //   'INSERT INTO consumidor (nome, email, senha) VALUES ($1, $2, $3)',
    //   [nome, email, senha]
    // );

    await client.query(
      "INSERT INTO consumidor (nome, email, senha_hash, role) VALUES ($1, $2, $3, $4)",
      [nome, email, senhaHash, role]
    );
    client.release();

    return NextResponse.json({ message: "Usuário criado com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar consumidor:", error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}



export async function GET() {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM consumidor')
    client.release()
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Erro listando consumidores:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

