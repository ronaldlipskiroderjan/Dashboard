import { useEffect, useState } from 'react';

export default function ResumoCards() {
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token_cobranca');
    fetch('http://localhost:8000/api/dashboard/resumo', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(dados => setResumo(dados))
    .catch(err => console.error(err));
  }, []);

  if (!resumo) return <p className="p-8 text-slate-500">Carregando indicadores...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">Total de Chamadas</h3>
        <p className="text-3xl font-bold text-slate-800">{resumo.total_chamadas}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">Acordos / Promessas</h3>
        <p className="text-3xl font-bold text-emerald-600">{resumo.chamadas_com_sucesso}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">Taxa de Conversão</h3>
        <p className="text-3xl font-bold text-blue-600">{resumo.taxa_conversao}%</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">Valor Recuperado</h3>
        <p className="text-3xl font-bold text-slate-800">
          R$ {resumo.valor_recuperado_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}