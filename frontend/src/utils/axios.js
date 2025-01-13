// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Cambia esto por la URL base de tu backend
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
