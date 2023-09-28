import {
	createCustomer,
	getCustomerById,
	getCustomers,
} from '../_services/CustomerService';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useCustomers() {
	return useQuery(['customers', 'get'], getCustomers);
}

export function useCustomerById(id: string) {
	return useQuery(['customers', 'get', id], () => getCustomerById(id));
}

export function useMutateCustomer() {
	return useMutation(['customers', 'create'], createCustomer);
}
