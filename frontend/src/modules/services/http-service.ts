import axios from 'axios';

export const httpService = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const secureHttpService = (accessToken: string) => {
    httpService.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    return httpService;
}