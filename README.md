# 📊 Dashboard de Operações - Sistema de Cobrança com IA

Um painel de controle (SaaS) moderno e responsivo desenvolvido para gestão e monitoramento de operações de cobrança automatizadas por Inteligência Artificial. Este sistema possui arquitetura *multi-tenant*, garantindo isolamento de dados por empresa.

## 🚀 Tecnologias Utilizadas

O projeto foi construído com uma separação clara entre as camadas de Frontend e Backend, utilizando as seguintes tecnologias:

### Frontend
* **React 18** (Framework UI)
* **Vite** (Build tool de alta performance)
* **Tailwind CSS v4** (Estilização utilitária e design responsivo)
* **React Router DOM** (Navegação SPA)

### Backend
* **Python 3**
* **FastAPI** (Framework web de alta performance)
* **Uvicorn** (Servidor ASGI)
* **JWT (JSON Web Tokens)** (Autenticação e Segurança)

## ✨ Funcionalidades Principais

* **🔐 Autenticação Segura:** Login protegido com geração e validação de tokens JWT.
* **📈 Dashboard de KPIs:** Visão geral em tempo real com métricas vitais (Total de chamadas, Taxa de conversão, Valor recuperado).
* **🧭 Navegação em Sidebar:** Menu lateral retrátil estilo painel de administrador.
* **📋 Histórico de Operações:** Tabela interativa listando todas as ligações do robô de cobrança.
* **🔎 Análise de Sentimento e Transcrição:** Modal flutuante que exibe os detalhes profundos da ligação, incluindo a transcrição completa gerada pela IA e o status do acordo.

## 🛠️ Como executar o projeto localmente

Siga os passos abaixo para rodar o sistema na sua máquina. Você precisará de dois terminais abertos.

### 1. Backend (FastAPI)
Abra o primeiro terminal, acesse a pasta do backend e inicie o ambiente virtual e o servidor:

```bash
# Entre na pasta
cd backend

# Ative o ambiente virtual (Linux/macOS)
source venv/bin/activate

# Inicie o servidor
uvicorn app.main:app --reload
A API estará rodando em http://localhost:8000

2. Frontend (React)
Abra o segundo terminal, acesse a pasta do frontend, instale as dependências e rode o projeto:

Bash
# Entre na pasta
cd frontend

# Instale as dependências (necessário apenas na primeira vez)
npm install

# Inicie o servidor de desenvolvimento
npm run dev
O Painel estará rodando em http://localhost:5173

🧑‍💻 Autor
Desenvolvido por Ronald Lipski Roderjan GitHub: @ronaldlipskiroderjan


---

### Dica de versionamento:
Para mandar isso para o GitHub, você pode rodar os comandos clássicos na raiz do seu projeto:
1. `git add README.md`
2. `git commit -m "docs: adicionando README profissional do projeto"`
3. `git push`

Ficou com a cara de um software de ponta, não acha? Se quiser adicionar mais alguma funcionalidade ou detalhe na documentação, é só falar!
