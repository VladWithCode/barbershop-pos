import AxiosInstance from '../../_utils/api';

export async function getCustomers() {
	return await AxiosInstance.get('/customers');
}
