import React from 'react';
import { Box, Paper, styled } from '@mui/material';
import CryptoSelector from './CryptoSelector';
import CryptoInfo from './CryptoInfo';
import PriceChart from './PriceChart';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 16,
    boxShadow: 'none',
    margin: theme.spacing(2, 0)
}));

function Layout({ cryptocurrencies, selectedCrypto, onCryptoChange, cryptoData }) {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            bgcolor: 'background.default',
            minHeight: '100vh',
            p: 3
        }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <StyledPaper>
                        <CryptoSelector
                            cryptocurrencies={cryptocurrencies}
                            selectedCrypto={selectedCrypto}
                            onCryptoChange={onCryptoChange}
                        />
                    </StyledPaper>
                    <StyledPaper>
                        <CryptoInfo cryptoData={cryptoData} />
                    </StyledPaper>
                </Box>
                <StyledPaper sx={{ flex: 2 }}>
                    <PriceChart cryptoData={cryptoData} />
                </StyledPaper>
            </Box>
        </Box>
    );
}

export default Layout; 