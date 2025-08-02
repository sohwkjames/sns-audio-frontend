import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api/audios`,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchAudios = () => axiosInstance.get('/');

export const uploadAudio = (formData) =>
  axiosInstance.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const getAudioById = (id) => axiosInstance.get(`/${id}`);

export const deleteAudio = (id) => axiosInstance.delete(`/${id}`);
