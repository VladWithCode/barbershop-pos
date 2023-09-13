'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import globals from '@/app/globals';
import Loading from '@/app/_components/Loading/Loading';
import useDebounce from '@/app/_hooks/useDebounce';

const useProducts = (options?: {
	search?: string;
	limit?: number;
	skip?: number;
}) => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchProducts = async () => {
		const response = await fetch(
			globals.API_BASE_URL +
				`/products?limit=${options?.limit || 16}&skip=${
					options?.skip || 0
				}&search=${options?.search || ''}`,
			{ mode: 'no-cors' }
		);
		const data = await response.json();

		return data;
	};

	useEffect(() => {
		fetchProducts()
			.then(data => {
				setProducts(data);
				setIsLoading(false);
			})
			.catch(err => {
				setError(err);
				setIsLoading(false);
			});
	}, []);

	return { products, isLoading, error };
};

function ProductList() {
	const [search, setSearch] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');

	useDebounce(() => setDebouncedSearch(search), 700, [search]);

	const { products, isLoading, error } = useProducts();
	/* 	const { data, error, isLoading, isError } = useQuery(
		['products', debouncedSearch],
		async () => {
			const response = await fetch(
				globals.API_BASE_URL +
					`/products?limit=16&search=${debouncedSearch}`,
				{ mode: 'no-cors' }
			);
			const data = await response.json();

			return data;
		}
	); */

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
			) : error ? (
				<p>{(error as any).message}</p>
			) : null}

			{products ? (
				<div className="grid grid-cols-2 max-h-[500px] lg:grid lg:flex-wrap gap-3 xl:gap-4 mx-auto overflow-y-auto">
					{products.map((p: any) => (
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
