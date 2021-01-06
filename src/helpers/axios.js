import axios from 'axios'

//Providing baseurl here
const baseURL = "http://localhost:3002/";

const axiosInstance = axios.create({
    baseURL: baseURL
});

export default axiosInstance;