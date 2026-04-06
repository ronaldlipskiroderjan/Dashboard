import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erroLogin, setErroLogin] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErroLogin('');
        setCarregando(true);

        try {
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', senha);

            const resposta = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                setErroLogin(dados.detail || "Erro ao fazer login. Verifique seus dados.");
                setCarregando(false);
                return;
            }

            console.log("Login aprovado! Token:", dados.access_token);

            localStorage.setItem('token_cobranca', dados.access_token);

            navigate('/dashboard');

        } catch (erro) {
            console.error(erro);
            setErroLogin("Erro de conexão com o servidor. O Backend está ligado?");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 w-full max-w-md">
                
                {/* Cabeçalho do Login */}
                <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Painel de Cobrança</h2>
                <p className="text-slate-500 mt-2">Faça login para acessar suas operações</p>
                </div>

                {/* Caixa de Erro */}
                {erroLogin && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
                    {erroLogin}
                </div>
                )}

                {/* Formulário */}
                <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                    <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Senha</label>
                    <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md"
                >
                    Entrar no Sistema
                </button>
                </form>

            </div>
            </div>
        );
}