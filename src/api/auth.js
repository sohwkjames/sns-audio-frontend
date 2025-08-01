import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function loginUser({ username, password }) {
  try {
    const response = await axiosInstance.post('/auth/login', {
      username,
      password
    });
    return response.data; // should be { token }
  } catch (err) {
    throw err.response?.data?.error || new Error('Login failed');
  }
}
