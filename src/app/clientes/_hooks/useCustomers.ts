import { queryClient } from '@/app/_components/GlobalQueryProvider';
import {
	CustomerDoc,
	createCustomer,
	deleteCustomer,
	getCustomerById,
	getCustomerPaymentInfo,
	getCustomers,
	updateCustomer,
} from '../_services/CustomerService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Sale } from '@/app/ventas/_services/sale.service';

export function useCustomers(params?: {
	search?: string;
	active_credits?: boolean;
}) {
	const { search, active_credits } = params || {};

	return useQuery<CustomerDoc[], { message: string; error?: any }>(
		['customers', 'get', search],
		() => getCustomers({ search, active_credits })
	);
}

export function useCustomerById(id: string) {
	return useQuery<CustomerDoc, { message: string; error?: any }>(
		['customers', 'get', id],
		() => getCustomerById(id)
	);
}

export function useCustomerPaymentInfo(id: string) {
	return useQuery<
		{
			customerData: CustomerDoc & {
				sales_data: (Sale & { item_count: number })[];
			};
			paymentData: {
				totalPendingPayment: number;
				expectedPaymentAmount: number;
				hasOverduePayments: boolean;
			};
		},
		{ message: string; error: any }
	>(['customers', 'payment-info', id], () => getCustomerPaymentInfo(id));
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
