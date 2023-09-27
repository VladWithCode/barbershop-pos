import {
	createCustomer,
	getCustomers,
} from '@/app/clientes/_services/CustomerService';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useCustomers() {
	return useQuery(['customers', 'get'], getCustomers);
}

export function useMutateCustomer() {
	return useMutation(['customers', 'create'], createCustomer);
}
