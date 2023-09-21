import { useMutation } from '@tanstack/react-query';
import AxiosInstance from '../_utils/api';
import Cookies from 'js-cookie';

async function loginMutateFn(loginData: {
	username: string;
	password: string;
}) {
	const response = await AxiosInstance.post('/auth/login', loginData);

	if (response.status !== 201) throw new Error(response.data.message);

	// Update the default headers with the new token
	AxiosInstance.defaults.headers.common[
		'Authorization'
	] = `Bearer ${response.data.token}`;

	return response.data;
}

export const useLogin = () => useMutation(['login'], loginMutateFn);

export async function validateLogin(token?: string) {
	const response = await AxiosInstance.get('/auth/validate', {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (response.status !== 200) {
		logout();
		throw new Error(response.data.message);
	}
	// Update the default headers with the new token
	AxiosInstance.defaults.headers.common[
		'Authorization'
	] = `Bearer ${response.data.token}`;

	return response.data;
}

export function logout() {
	Cookies.remove('access_token');
	AxiosInstance.defaults.headers.common['Authorization'] = '';
}
