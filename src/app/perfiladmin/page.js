import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function PerfilAdminPage() {
    const session = await getServerSession(authOptions);

    //Importante frizar que, utilizamos o getServerSession para validar e proteger determinadas 
    // páginas no servidor, antes mesmo de gerar o HTML da mesma. Permitindo apenas que usuários autorizados tenham acesso a ela.
    // Já o useSession utilizamos quando precisamos mostrar conteúdos não sensíveis que dependem do usuário já autenticado, para
    // saber rapidamente se o usuário está logado e evitar chamadas desnecessárias. 
    if (!session) redirect("/novoLogin");

    return (
        <div>
            <h1>Página e perfil de admin</h1>
            <p>Nome: {session.user.name}</p>
            <p>E-mail: {session.user.email}</p>
            <p>Papel: {session.user.role}</p>
        </div>
    );
}
