import jwt
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException, status


SECRET_KEY = "sua_chave_super_secreta_para_o_projeto"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 600

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = HTTPBearer()

def verificar_senha(senha_plana: str, senha_hash: str) -> bool:
    return pwd_context.verify(senha_plana, senha_hash)

def obter_hash_senha(senha: str) -> str:
    return pwd_context.hash(senha) 

def criar_token_acesso(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def obter_usuario_atual(auth: HTTPAuthorizationCredentials = Depends(oauth2_scheme)) -> dict:
    token = auth.credentials

    credentials_excepiton = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas ou token expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        id_empresa: int = payload.get("id_empresa")
        
        if email is None or id_empresa is None:
            raise credentials_excepiton
        
        return {"email": email, "id_empresa": id_empresa}
    except jwt.PyJWTError:
        raise credentials_excepiton