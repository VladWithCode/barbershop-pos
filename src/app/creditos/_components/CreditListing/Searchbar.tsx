'use client';
import React from 'react';
import useCreditListingStore from '../../_stores/useCreditListingStore';
import Sb from '@/app/_components/Searchbar';

export default function Searchbar() {
	const { setSearch } = useCreditListingStore(state => ({
		setSearch: state.setSearch,
	}));

	return (
		<div className="text-zinc-800 bg-zinc-300 p-1 rounded">
			<Sb placeholder="Buscar..." onSearch={setSearch} />
		</div>
	);
}
