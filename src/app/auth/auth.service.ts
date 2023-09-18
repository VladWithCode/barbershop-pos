import { useMutation } from '@tanstack/react-query';
import AxiosInstance from '../_utils/api';

async function loginMutateFn(loginData: {
	username: string;
	password: string;
}) {
	const response = await AxiosInstance.post('/auth/login', loginData);

	if (response.status !== 201) throw new Error(response.data.message);

	return response.data;
}

export const useLogin = () => useMutation(['login'], loginMutateFn);

export async function validateLogin(token?: string) {
	const response = await AxiosInstance.get('/auth/validate', {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (response.status !== 200) throw new Error(response.data.message);

	return response.data;
}
