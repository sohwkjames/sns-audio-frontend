import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api/admin`,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchUsers = () => axiosInstance.get('/users');
export const createUser = (user) => axiosInstance.post('/users', user);
export const updateUser = (id, user) => axiosInstance.put(`/users/${id}`, user);
export const deleteUser = (id) => axiosInstance.delete(`/users/${id}`);
