'use client';
import GlobalQueryProvider from '@/app/components/GlobalQueryProvider';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductCard from './ProductCard';
import globals from '@/app/globals';

export function ProductListWrapper() {
	return (
		<GlobalQueryProvider>
			<ProductList />
		</GlobalQueryProvider>
	);
}

function ProductList() {
	const { data, error, isLoading, isError } = useQuery(
		['products'],
		async () => {
			const response = await fetch(
				globals.API_BASE_URL + '/products?limit=16'
			);

			if (!response.ok)
				throw new Error('Error recuperando los productos');

			return await response.json();
		}
	);

	return (
		<div className="flex flex-col lg:flex-wrap gap-4 xl:gap-4 flex-grow mx-auto overflow-y-auto custom-scroll-bar">
			{!isLoading &&
				data?.map((p: any) => (
					<ProductCard
						_id={p._id}
						name={p.name}
						picture={p.picture}
						key={p._id}
					/>
				))}
		</div>
	);
}

export default ProductList;
