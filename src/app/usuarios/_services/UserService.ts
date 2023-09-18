import AxiosInstance from '@/app/_utils/api';

export async function getUsers() {
	return await AxiosInstance.get('/users');
}
