import { useMutation } from '@tanstack/react-query';
import globals from '../globals';

const baseUrl = globals.API_BASE_URL + '/auth';

async function loginMutateFn(loginData: {
	username: string;
	password: string;
}) {
	const response = await fetch(baseUrl + '/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(loginData),
	});

	const data = await response.json();

	if (!response.ok) throw new Error(data.message);

	return data;
}

export const useLogin = () => useMutation(['login'], loginMutateFn);
