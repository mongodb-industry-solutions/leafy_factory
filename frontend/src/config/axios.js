import axios from 'axios'
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL // http://localhost:3000 || http://ec2-3-91-158-15.compute-1.amazonaws.com:8000/
})
export default axiosClient