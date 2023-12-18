import React from 'react';
import Listing from './Listing';
import Searchbar from './Searchbar';
import Pagination from './Pagination';

export default function CreditListing() {
	return (
		<div className="flex-auto flex flex-col gap-y-2">
			<Searchbar />
			<Listing className="flex-auto" />
			<Pagination />
		</div>
	);
}
