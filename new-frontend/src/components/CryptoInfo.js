import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

function CryptoInfo({ cryptoData }) {
    if (!cryptoData) return null;

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                {cryptoData.name} ({cryptoData.symbol})
            </Typography>
            
            <Box sx={{ my: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                    ${Number(cryptoData.quote.USD.price).toFixed(2)}
                </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <InfoItem 
                    label="24h Volume" 
                    value={`$${Number(cryptoData.quote.USD.volume_24h).toLocaleString()}`}
                />
                <InfoItem 
                    label="Market Cap" 
                    value={`$${Number(cryptoData.quote.USD.market_cap).toLocaleString()}`}
                />
                <InfoItem 
                    label="Circulating Supply" 
                    value={Number(cryptoData.circulating_supply).toLocaleString()}
                />
            </Box>
        </Box>
    );
}

const InfoItem = ({ label, value }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ color: '#666' }}>
            {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {value}
        </Typography>
    </Box>
);

export default CryptoInfo; 