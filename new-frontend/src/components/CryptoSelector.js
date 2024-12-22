import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';

function CryptoSelector({ cryptocurrencies, selectedCrypto, onCryptoChange }) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Select Cryptocurrency
            </Typography>
            <FormControl fullWidth>
                <Select
                    value={selectedCrypto}
                    onChange={(e) => onCryptoChange(e.target.value)}
                    sx={{
                        backgroundColor: 'background.paper',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.1)'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.2)'
                        }
                    }}
                >
                    {cryptocurrencies?.map((crypto) => (
                        <MenuItem key={crypto.symbol} value={crypto.symbol}>
                            {crypto.name} ({crypto.symbol})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default CryptoSelector; 