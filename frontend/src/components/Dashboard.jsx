export default function Dashboard() {
    const handleLogout = () => {
         localStorage.removeItem('token_cobranca');
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-slate-100 p-8 font-sans">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h1 className="text-3xl font-bold text-slate-800">Bem-vindo ao Dashboard</h1>
            <p className="text-slate-500 mt-2">Você está logado com sucesso!</p>
            
            <button 
                onClick={handleLogout}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                Sair do Sistema
            </button>
        </div>
        </div>
  );
}