from pydantic import BaseModel

class DashboardResumo(BaseModel):
    total_chamadas: int
    chamadas_com_sucesso: int
    taxa_conversao: float
    valor_recuperado_total: float
    id_empresa: int