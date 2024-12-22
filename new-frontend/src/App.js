import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Layout from './components/Layout';
import { getCryptocurrencies, getCryptoDetails } from './services/api';

function App() {
    const [cryptocurrencies, setCryptocurrencies] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState('BTC');
    const [cryptoData, setCryptoData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCryptocurrencies();
    }, []);

    useEffect(() => {
        if (selectedCrypto) {
            fetchCryptoData(selectedCrypto);
        }
    }, [selectedCrypto]);

    const fetchCryptocurrencies = async () => {
        try {
            setError(null);
            const data = await getCryptocurrencies();
            setCryptocurrencies(data.data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching cryptocurrencies:', error);
        }
    };

    const fetchCryptoData = async (symbol) => {
        try {
            setError(null);
            const data = await getCryptoDetails(symbol);
            setCryptoData(data.data[symbol]);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching crypto data:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout
                cryptocurrencies={cryptocurrencies}
                selectedCrypto={selectedCrypto}
                onCryptoChange={setSelectedCrypto}
                cryptoData={cryptoData}
            />
        </ThemeProvider>
    );
}

export default App; 