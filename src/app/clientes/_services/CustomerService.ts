import AxiosInstance from '../../_utils/api';

export type Customer = {
	fullname: string;
	phone: string;
	address: string;
	dob: string;
	social_media: string;
};

export async function getCustomers() {
	return await AxiosInstance.get('/customers');
}

export async function createCustomer(customerData: Customer) {
	return await AxiosInstance.post('/customers', customerData);
}
