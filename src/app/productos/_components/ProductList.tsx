'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Loading from '@/app/_components/Loading/Loading';
import useDebounce from '@/app/_hooks/useDebounce';
import { getProducts } from '../_services/product.service';

const PAGE_LIMIT = 25; // Last 25 sold products

function ProductList() {
	const [search, setSearch] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');

	useDebounce(() => setDebouncedSearch(search), 700, [search]);

	const { data, error, isLoading, isError } = useQuery(
		['products', debouncedSearch, PAGE_LIMIT],
		() =>
			getProducts({
				search: debouncedSearch,
				limit: PAGE_LIMIT,
			})
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
			) : isError && error ? (
				<p>{(error as any).message}</p>
			) : null}

			{data && data.products.length > 0 ? (
				<div className="grid grid-cols-2 lg:grid-cols-4 max-h-[500px] xl:max-h-[700px] gap-3 xl:gap-4 mx-auto overflow-hidden overflow-y-auto custom-scroll-bar">
					{data.products.map((p: any) => (
						<ProductCard
							_id={p._id}
							name={p.name}
							picture={p.picture}
							key={p._id}
						/>
					))}
				</div>
			) : null}
		</div>
	);
}

export default ProductList;
