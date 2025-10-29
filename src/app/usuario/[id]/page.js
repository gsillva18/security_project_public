import db from "@/lib/db";

export default async ({params}) => {
    const usuario = await db.query(
        "select * from usuario where id = "+params.id
    );
    return (
        <>
            <h1>Página do usuario: 
                {usuario.rows[0].nome}
            </h1>
            <p>O usuario faz parte do projeto 
                {usuario.rows[0].cargo}
            </p>
        </>
    )
}