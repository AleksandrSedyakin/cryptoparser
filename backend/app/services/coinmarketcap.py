import httpx
from fastapi import HTTPException
from datetime import datetime, timedelta
from ..config import settings

async def get_all_cryptocurrencies(limit: int = 100):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{settings.CMC_BASE_URL}/cryptocurrency/listings/latest",
                headers={"X-CMC_PRO_API_KEY": settings.API_KEY},
                params={"limit": limit}
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"Error fetching cryptocurrencies: {str(e)}")

async def get_crypto_details(symbol: str):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{settings.CMC_BASE_URL}/cryptocurrency/quotes/latest",
                headers={"X-CMC_PRO_API_KEY": settings.API_KEY},
                params={"symbol": symbol}
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"Error fetching crypto details: {str(e)}")

async def get_historical_data(symbol: str, days: int = 30):
    try:
        # Get current data
        current_data = await get_crypto_details(symbol)
        current_price = current_data['data'][symbol]['quote']['USD']['price']
        
        # Generate sample historical data (since CMC API limits)
        dates = []
        prices = []
        current_date = datetime.now()
        
        for i in range(days):
            date = current_date - timedelta(days=i)
            # Create some variation in price for demo
            variation = (1 + (hash(str(date)) % 100 - 50) / 1000)
            price = current_price * variation
            
            dates.insert(0, date.strftime('%Y-%m-%d'))
            prices.insert(0, price)
        
        return {
            'dates': dates,
            'prices': prices
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 