'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import globals from '@/app/globals';
import Loading from '@/app/_components/Loading/Loading';
import useDebounce from '@/app/_hooks/useDebounce';

function ProductList() {
	const [search, setSearch] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');

	useDebounce(() => setDebouncedSearch(search), 700, [search]);

	const { data, error, isLoading, isError } = useQuery(
		['products', debouncedSearch],
		async () => {
			const response = await fetch(
				globals.API_BASE_URL +
					`/products?limit=16&search=${debouncedSearch}`,
				{ mode: 'no-cors' }
			);
			console.log(response);
			const data = await response.json();

			if (!response.ok)
				throw new Error(
					data.message || 'Error recuperando los productos'
				);

			return data;
		}
	);

	return (
		<div className="w-full h-full px-8 pt-2 overflow-hidden overflow-x-auto mb-6">
			<div className="w-full h-10 mb-4 flex group">
				<input
					className="bg-transparent border-2 border-r-0 border-transparent border-b-zinc-950 grow focus:ring-0 focus:border-barber-red focus:rounded peer transition duration-75"
					type="text"
					name="product-name"
					id="product-name"
					placeholder="Buscar..."
					onChange={e => setSearch(e.target.value)}
				/>
				<svg className="w-8 h-full fill-zinc-950 -ml-1 my-auto peer-focus:bg-barber-red peer-focus:fill-zinc-50 rounded-r transition duration-75">
					<use href="/sprites.svg#search"></use>
				</svg>
			</div>

			{isLoading ? (
				<Loading />
			) : data ? (
				<div className="grid grid-cols-2 max-h-[500px] lg:grid lg:flex-wrap gap-3 xl:gap-4 mx-auto overflow-y-auto">
					{data?.map((p: any) => (
						<ProductCard
							_id={p._id}
							name={p.name}
							picture={p.picture}
							key={p._id}
						/>
					))}
				</div>
			) : isError && error ? (
				<p>{(error as any).message}</p>
			) : null}
		</div>
	);
}

export default ProductList;
