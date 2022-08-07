import axios from 'axios';
import AuthType from '../../models/AuthType';

const API_URL = '/api/users/';

// Register user
const register = async (userData: AuthType): Promise<any> => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const logout = async (): Promise<any> => {
    localStorage.removeItem('user');
};

// Login user
const login = async (userData: AuthType): Promise<any> => {
    const response = await axios.post(`${API_URL}login`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const authService = {
    register,
    logout,
    login,
};

export default authService;
