from fastapi import FastAPI, Depends, HTTPException, status 
from fastapi.security import OAuth2PasswordRequestForm 
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.chamada import ChamadaResumo, ChamadaDetalhe
from app.schemas.dashboard import DashboardResumo
from app.core.security import (
    criar_token_acesso,
    verificar_senha,
    obter_usuario_atual
)
from app.core.security import obter_hash_senha

print(f"NOVO HASH: {obter_hash_senha('123456')}")

app = FastAPI(
    title = "Painel de Cobrança - API",
    description = "Backend multi-tenant para gestão de cobrança.",
    version = "1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Status"])
async def root():
    return {
        "sistema": "API - Painel de Cobrança", 
        "status": "online", 
        "documentacao": "/docs"
    }

db_usuarios = {
    "ronald@lipski.com": {
        "email": "ronald@lipski.com",
        "hashed_password": "$2b$12$SfcK.Efz.a14iNUuvTCYjeVFQomEG.XazhfY2VOkqHvqxzt8ZLxXi", 
        "id_empresa": 101, 
    },
    "gestor@cliente_b.com": {
        "email": "gestor@cliente_b.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW", 
        "id_empresa": 202,
    }
}

db_chamadas = [
    {
        "id": 1,
        "telefone_cliente": "(41) 99999-0001",
        "data_hora": "2026-04-03T10:30:00",
        "status": "Acordo Fechado",
        "duracao_segundos": 145,
        "id_empresa": 101
    },
    {
        "id": 2,
        "telefone_cliente": "(11) 98888-1234",
        "data_hora": "2026-04-03T11:15:00",
        "status": "Promessa de Pagamento",
        "duracao_segundos": 88,
        "id_empresa": 101
    }
]

db_detalhes_chamada = {
    1: {
        "id": 1,
        "telefone_cliente": "(41) 99999-0001",
        "data_hora": "2026-04-03T10:30:00",
        "status": "Acordo Fechado",
        "duracao_segundos": 145,
        "id_empresa": 101,
        "transcricao_completa": "Robô: Olá, falo com Ronald? Cliente: Sim. Robô: Identificamos um débito...",
        "resumo_ia": "O cliente demonstrou interesse em quitar a dívida e solicitou o boleto via WhatsApp.",
        "sentimento_cliente": "Colaborativo",
        "audio_url": "https://meu-bucket.r2.cloudflarestorage.com/audio001.mp3"
    }
}

# === Rota de Autenticação ===
@app.post("/api/auth/login", tags=["Autenticação"])
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    
    user = db_usuarios.get(form_data.username)

    if not user or not verificar_senha(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = criar_token_acesso(
        data={"sub": user["email"], "id_empresa": user["id_empresa"]}
    )

    return {"access_token": access_token, "token_type": "bearer"}

# === Rota de Chamadas ===
@app.get("/api/chamadas", response_model=list[ChamadaResumo], tags=["Chamadas"])
async def listar_chamadas(usuario_logado: dict = Depends(obter_usuario_atual)):
    minhas_chamadas = [c for c in db_chamadas if c["id_empresa"] == usuario_logado["id_empresa"]]
    return minhas_chamadas

@app.get("/api/chamadas/{chamada_id}", response_model=ChamadaDetalhe, tags=["Chamadas"])
async def obter_detalhe_chamada(chamada_id: int, usuario_logado: dict = Depends(obter_usuario_atual)):
    print(f"Buscando ID: {chamada_id} para a Empresa: {usuario_logado['id_empresa']}")
    
    chamada = db_detalhes_chamada.get(chamada_id)

    if not chamada:
        raise HTTPException(status_code=404, detail="ID não encontrado no dicionário")
    
    if chamada["id_empresa"] != usuario_logado["id_empresa"]:
        raise HTTPException(status_code=403, detail="Você não tem permissão para acessar esta chamada")

    return chamada

# === Rotas Protegidas ===
@app.get("/api/dashboard", tags=["Dashboard"])
async def obter_resumo_dashboard(usuario_logado: dict = Depends(obter_usuario_atual)):  
    id_empresa_segura = usuario_logado["id_empresa"]

    return {
        "mensagem": "Autenticado com sucesso!",
        "empresa_operacao": id_empresa_segura,
        "usuario": usuario_logado["email"],
        "dados_simulados": f"Exibindo apenas dados da empresa {id_empresa_segura}."
    }

# === Rota de Dahboard ===
@app.get("/api/dashboard/resumo", response_model=DashboardResumo, tags=["Dashboard"])
async def obter_resumo_dashboard_estatisticas(usuario_logado: dict = Depends(obter_usuario_atual)):
    minhas_chamadas = [c for c in db_chamadas if c["id_empresa"] == usuario_logado["id_empresa"]]

    total = len(minhas_chamadas)

    sucesso = len([c for c in minhas_chamadas if c["status"] in ["Acordo Fechado", "Promessa de Pagamento"]])

    taxa = (sucesso / total * 100) if total > 0 else 0.0

    return {
        "total_chamadas": total,
        "chamadas_com_sucesso": sucesso,
        "taxa_conversao": round(taxa, 2),
        "valor_recuperado_total": 15750.50, 
        "id_empresa": usuario_logado["id_empresa"]
    }