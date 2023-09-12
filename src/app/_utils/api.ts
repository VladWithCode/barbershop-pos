import axios from 'axios';
import globals from '../globals';

const AxiosInstance = axios.create({
	baseURL: globals.API_BASE_URL,
	timeout: 2500,
});

export default AxiosInstance;
