import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../_services/product.service';

export function useProducts({
	search,
	skip,
	limit,
}: {
	search?: string;
	skip?: number;
	limit?: number;
}) {
	return useQuery(['products', { search, skip, limit }], () =>
		getProducts({ search, skip, limit })
	);
}
