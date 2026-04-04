from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional, List

class ChamadaResumo(BaseModel):
    id: int
    telefone_cliente: str
    data_hora: datetime
    status: str
    duracao_segundos: int
    id_empresa: int

    class Config:
        from_attributes = True

class ChamadaDetalhe(ChamadaResumo):
    transcricao_completa: str
    resumo_ia: str
    sentimento_cliente: str
    audio_url: Optional[HttpUrl] = None
 