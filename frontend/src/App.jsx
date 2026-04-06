import { useEffect, useState } from 'react'

function App() {
    const [mensagemBack, setMensagemBack] = useState("Conectado ao servidor...")

    useEffect(() => {
        fetch('http://localhost:8000/')
            .then(resposta => resposta.json())
            .then(dados => setMensagemBack(dados.sistema + " - " + dados.status))
            .catch(erro => setMensagemBack("Erro ao conectar no Backend"))
    },[])

    return (
        <div>
            <h1>Dashboard de Cobrança</h1>
            <p>
                <strong>Status do Backend:</strong>{mensagemBack}
            </p>
        </div>
    )
}

export default App