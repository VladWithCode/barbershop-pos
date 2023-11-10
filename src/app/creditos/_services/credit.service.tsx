import AxiosInstance from '@/app/_utils/api';
import { CreditListingFilters, ListingCredit } from '../types';

export async function getCreditListing({
	search,
	page = 0,
	itemsPerPage = 25,
	filters,
}: {
	search: string;
	page: number;
	itemsPerPage?: number;
	filters: CreditListingFilters;
}) {
	const searchParams = new URLSearchParams({
		search,
		page: page.toString(),
		itemsPerPage: itemsPerPage.toString(),
	});

	// Loop over filters and append non null ones to url params
	for (const [name, value] of Object.entries(filters)) {
		if (value !== null) searchParams.append(name, String(value));
	}

	const response = await AxiosInstance.get<ListingCredit[]>(
		'/credits?' + searchParams.toString()
	);

	if (response.status !== 200) {
		console.error(response.data);
		throw new Error('Error al recuperar los creditos');
	}

	return response.data;
}
