from fastapi import APIRouter
from ..services import coinmarketcap

router = APIRouter()

@router.get("/cryptocurrencies")
async def get_cryptocurrencies():
    return await coinmarketcap.get_all_cryptocurrencies()

@router.get("/cryptocurrency/{symbol}")
async def get_cryptocurrency_details(symbol: str):
    return await coinmarketcap.get_crypto_details(symbol)

@router.get("/cryptocurrency/{symbol}/history")
async def get_crypto_history(symbol: str):
    return await coinmarketcap.get_historical_data(symbol)
 