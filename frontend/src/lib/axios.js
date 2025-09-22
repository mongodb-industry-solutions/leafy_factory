import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api/backend'  // Use Next.js API proxy for Kanopy compatibility
});

export default axiosClient;
