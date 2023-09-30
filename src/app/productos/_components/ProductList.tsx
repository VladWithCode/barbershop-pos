'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Loading from '@/app/_components/Loading/Loading';
import useDebounce from '@/app/_hooks/useDebounce';
import { getProducts } from '../_services/product.service';

const PAGE_LIMIT = 25; // Last 25 sold products

export type ProductListProps = {
	search: string;
};

function ProductList({ search }: ProductListProps) {
	const { data, error, isLoading, isError } = useQuery(
		['products', search, PAGE_LIMIT],
		() =>
			getProducts({
				search,
				limit: PAGE_LIMIT,
			})
	);

	return (
		<div className="grid grid-cols-4 gap-2 w-full">
			{isLoading && (
				<div className="col-span-full row-span-full m-auto">
					<Loading />
				</div>
			)}
			{isError && error ? <p>{(error as any).message}</p> : null}

			{data && data.products.length > 0
				? data.products.map((p: any) => (
						<ProductCard
							_id={p._id}
							name={p.name}
							picture={p.picture}
							key={p._id}
						/>
				  ))
				: null}
		</div>
	);
}

export default ProductList;
