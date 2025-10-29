import { NextResponse } from "next/server";
//vai buscar a sessão do NextAuth no servidor
import { getServerSession } from "next-auth";

//Nossa config que passamos pro NextAuth no handler [...nextauth], que criamos na aula passada.
// Essa config informa ao getServerSession como validar a sessão.
import { authOptions } from "../auth/route";
import pool from "@/lib/db";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
        return NextResponse.json({ error: "Proibido" }, { status: 403 });
    }

    const client = await pool.connect();
    const result = await client.query("SELECT id, nome, email, role FROM consumidor");
    client.release();
    return NextResponse.json(result.rows);
}
