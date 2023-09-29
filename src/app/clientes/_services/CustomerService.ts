import AxiosInstance from '../../_utils/api';

export type Customer = {
	fullname: string;
	phone: string;
	dob: string;
	social_media?: string;
	social_media_name: string;
	address?: string;
};

export type CustomerDoc = Customer & {
	_id: string;
};

export async function getCustomers({
	search,
	active = true,
	limit,
	offset,
}: {
	search?: string;
	active?: boolean;
	limit?: number;
	offset?: number;
}) {
	const query = new URLSearchParams();
	query.append('active', active.toString());

	if (limit && limit > 0) query.append('limit', limit.toString());
	if (offset && offset > 0) query.append('offset', offset.toString());
	if (search) {
		query.append('search', search);
	}
	const response = await AxiosInstance.get<CustomerDoc[]>(
		'/customers?' + query.toString()
	);

	return response.data;
}

export async function getCustomerById(id: string) {
	const response = await AxiosInstance.get<CustomerDoc>(`/customers/${id}`);

	return response.data;
}

export async function createCustomer(customerData: Customer) {
	const response = await AxiosInstance.post('/customers', customerData);
	return response.data;
}

export async function updateCustomer(id: string, customerData: CustomerDoc) {
	const response = await AxiosInstance.put(`/customers/${id}`, customerData);
	return response.data;
}

export async function deleteCustomer(id: string) {
	const response = await AxiosInstance.delete(`/customers/${id}`);
	return response.data;
}
