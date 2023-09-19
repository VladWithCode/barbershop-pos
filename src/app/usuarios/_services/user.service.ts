import AxiosInstance from '@/app/_utils/api';
import { useQuery } from '@tanstack/react-query';

export async function getUsers() {
	return await AxiosInstance.get('/users');
}

export async function getUser(username: string): Promise<{
	_id: string;
	username: string;
	display_name: string;
	role: string;
}> {
	const response = await AxiosInstance.get(`/users/${username}`);

	return response.data;
}

export function useUser(username: string) {
	return useQuery(['user', username], () => getUser(username));
}
