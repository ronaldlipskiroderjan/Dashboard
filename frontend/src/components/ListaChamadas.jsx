import { useEffect, useState } from "react";

export default function Listachamadas() {
    const [chamadas, setChamadas] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token_cobranca');

        fetch('http://localhost:8000/api/chamadas', {
            headers: {'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(dados => {
            console.log("O que o Backend respondeu:", dados);

            if (Array.isArray(dados)) {
                setChamadas(dados);
            } else {
                console.error("Atenção: O formato não é uma lista!, dados");
                setChamadas([]);
            }
        })
        .catch(err => console.error("Erro na requisição:", err))
        .finally(() => setCarregando(false));
    }, []);

    if (carregando) {
        return <p className="text-slate-500 font-medium">Buscando histórico...</p>;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Telefone</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Duração</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Ações</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
            {chamadas.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-700 font-medium">{c.telefone_cliente}</td>
                <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    {c.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{c.duracao_segundos}s</td>
                <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:underline font-semibold">Ver Detalhes</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}