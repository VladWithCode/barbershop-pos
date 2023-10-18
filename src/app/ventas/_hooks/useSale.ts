import { useQuery } from '@tanstack/react-query';
import { Sale, getSale } from '../_services/sale.service';

export const useSale = (id: string) =>
	useQuery<Sale, { message: string; error?: any }>(
		['sales', 'get', 'detail', id],
		() => getSale(id)
	);
