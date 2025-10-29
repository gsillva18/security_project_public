import {useState} from 'react'
import style from "./styles.module.css"

export default function AutenticarForm({ onAddConsumidor}) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddConsumidor({nome, email, senha})
        setNome(''),
        setEmail(''),
        setSenha('')
    }

    return (
      <form onSubmit={handleSubmit}>

        <label className={style.name} htmlFor="nome"> Nome:</label>
        <br></br>
            <input className={style.logar}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
     
       <br></br>
        <label className={style.email} htmlFor="email">Email:</label>
        <br></br>
            <input className={style.campoemail}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        <br></br>
        <label className={style.senha} htmlFor="senha">Senha:</label>
        <br></br>
            <input className={style.camposenha}
              type='password'
              
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <br></br>
            <a href="novoLogin"> </a>
            <button className={style.button} type='submit'>
                       Cadastrar

            </button>

      </form>
    )

}