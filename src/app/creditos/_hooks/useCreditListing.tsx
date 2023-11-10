import { useQuery } from '@tanstack/react-query';
import { CreditListingFilters } from '../types';
import { getCreditListing } from '../_services/credit.service';

export function useCreditListing({
	search,
	page,
	itemsPerPage,
	filters,
}: {
	search: string;
	page: number;
	itemsPerPage?: number;
	filters: CreditListingFilters;
}) {
	return useQuery(['credits', 'listing', search, page, filters], () =>
		getCreditListing({ search, page, itemsPerPage, filters })
	);
}
