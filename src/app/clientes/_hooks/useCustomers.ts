import { getCustomers } from '@/app/clientes/_services/CustomerService';
import { useQuery } from '@tanstack/react-query';

export function useCustomers() {
	return useQuery(['customers'], getCustomers);
}
