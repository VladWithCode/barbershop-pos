import { queryClient } from '@/app/_components/GlobalQueryProvider';
import {
	CustomerDoc,
	createCustomer,
	deleteCustomer,
	getCustomerById,
	getCustomers,
	updateCustomer,
} from '../_services/CustomerService';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useCustomers() {
	return useQuery<CustomerDoc[], { message: string; error?: any }>(
		['customers', 'get'],
		getCustomers
	);
}

export function useCustomerById(id: string) {
	return useQuery<CustomerDoc, { message: string; error?: any }>(
		['customers', 'get', id],
		() => getCustomerById(id)
	);
}

export function useUpdateCustomer(id: string) {
	return useMutation(
		['customers', 'update', id],
		(customerData: CustomerDoc) =>
			updateCustomer(id, { ...customerData, _id: id }),
		{
			onSuccess: () => {
				// Invalidate and refetch
				queryClient.invalidateQueries(['customers', 'get', id]);
			},
		}
	);
}

export function useMutateCustomer() {
	return useMutation(['customers', 'create'], createCustomer);
}

export function useDeleteCustomer(id: string) {
	return useMutation(['customers', 'delete', id], () => deleteCustomer(id), {
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries(['customers', 'get']);
		},
	});
}
