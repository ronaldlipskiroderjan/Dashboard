from fastapi import FastAPI, Depends, HTTPException, status 
from fastapi.security import OAuth2PasswordRequestForm    
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

@app.get("/", tags=["Status"])
async def root():
    return {
        "sistema": "Agendai API", 
        "status": "online", 
        "documentacao": "/docs"
    }

db_usuarios = {
    "operador@cliente_a.com": {
        "email": "operador@cliente_a.com",
        "hashed_password": "$2b$12$SfcK.Efz.a14iNUuvTCYjeVFQomEG.XazhfY2VOkqHvqxzt8ZLxXi", 
        "id_empresa": 101, 
    },
    "gestor@cliente_b.com": {
        "email": "gestor@cliente_b.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW", 
        "id_empresa": 202,
    }
}

# === Rota de autenticação ===
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

# === Rotas Protegidas ===
@app.get("/api/dashboard", tags=["Dashboard"])
async def obter_resumo_dashboard(usuario_logado: dict = Depends(obter_usuario_atual)):
    """ 
    O 'usuario_logado' é injetado automaticamente após a validação do token JWT.
    """
    id_empresa_segura = usuario_logado["id_empresa"]

    return {
        "mensagem": "Autenticado com sucesso!",
        "empresa_operacao": id_empresa_segura,
        "usuario": usuario_logado["email"],
        "dados_simulados": f"Exibindo apenas dados da empresa {id_empresa_segura}."
    }
