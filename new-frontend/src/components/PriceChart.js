import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot } from 'recharts';
import { getCryptoHistory } from '../services/api';

function PriceChart({ cryptoData }) {
    const [historicalData, setHistoricalData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            if (cryptoData) {
                try {
                    setLoading(true);
                    const data = await getCryptoHistory(cryptoData.symbol);
                    const chartData = data.dates.map((date, index) => ({
                        date,
                        price: data.prices[index]
                    }));
                    setHistoricalData(chartData);
                } catch (error) {
                    console.error('Error fetching historical data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchHistoricalData();
    }, [cryptoData]);

    if (!cryptoData || loading) {
        return (
            <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}>
                <CircularProgress />
            </Box>
        );
    }

    const CustomDot = (props) => {
        const { cx, cy, payload } = props;
        const isSignificantChange = Math.abs(payload.priceChange) > 2;

        if (!isSignificantChange) return null;

        return (
            <Dot
                cx={cx}
                cy={cy}
                r={4}
                fill="#fff"
                stroke="#2196f3"
                strokeWidth={2}
            />
        );
    };

    return (
        <Box sx={{ height: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Price Chart (30 Days)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={historicalData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                        dataKey="date" 
                        stroke="#666"
                        tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis 
                        stroke="#666"
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#232733',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff'
                        }}
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#2196f3" 
                        strokeWidth={2}
                        dot={<CustomDot />}
                        activeDot={{ r: 8 }}
                        name="Price (USD)"
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default PriceChart; 