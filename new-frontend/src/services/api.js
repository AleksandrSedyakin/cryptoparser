import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

const handleError = (error) => {
    if (error.response) {
        throw new Error(error.response.data.detail || 'An error occurred');
    }
    throw error;
};

export const getCryptocurrencies = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cryptocurrencies`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getCryptoDetails = async (symbol) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cryptocurrency/${symbol}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getCryptoHistory = async (symbol) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cryptocurrency/${symbol}/history`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
