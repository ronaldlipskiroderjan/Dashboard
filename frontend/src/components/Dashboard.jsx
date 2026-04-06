import { useEffect, useState } from "react";
import { useNavigate, Link, Outlet} from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate();
    const [menuAberto, setMenuAberto] = useState(false);
    
    const handleLogout = () => {
      localStorage.removeItem('token_cobranca');
      navigate('/');
    };

    return (
      <div className="min-h-screen bg-slate-50 font-sans relative">
        
        {/* Sidebar (Menu Lateral) */}
        <aside className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b flex justify-between items-center">
            <span className="font-bold text-slate-800">Menu Principal</span>
            <button onClick={() => setMenuAberto(false)}>✕</button>
          </div>
          <nav className="p-4 space-y-2">
            <Link to="/dashboard" onClick={() => setMenuAberto(false)} className="block p-3 hover:bg-blue-50 rounded-lg text-slate-700 font-medium">📊 Visão Geral</Link>
            <Link to="/dashboard/chamadas" onClick={() => setMenuAberto(false)} className="block p-3 hover:bg-blue-50 rounded-lg text-slate-700 font-medium">📞 Histórico de Chamadas</Link>
          </nav>
        </aside>

        {/* Navbar */}
        <nav className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setMenuAberto(true)} className="p-2 hover:bg-slate-100 rounded-lg">
              <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-slate-600"></div>
                <div className="w-6 h-0.5 bg-slate-600"></div>
                <div className="w-6 h-0.5 bg-slate-600"></div>
              </div>
            </button>
            <h1 className="text-xl font-bold text-slate-800">Painel de Operações</h1>
          </div>
          <button onClick={handleLogout} className="text-red-600 font-semibold">Sair</button>
        </nav>

        {/* ÁREA DINÂMICA (Onde o conteúdo troca) */}
        <main className="p-8 max-w-7xl mx-auto">
          <Outlet /> 
        </main>
      </div>
    );
}