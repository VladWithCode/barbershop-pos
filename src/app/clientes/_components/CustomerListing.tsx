'use client';

import React from 'react';
import CustomerCard from './CustomerCard';
import { useCustomers } from '../_hooks/useCustomers';
import Loading from '@/app/_components/Loading/Loading';

export default function CustomerListing({ search }: { search?: string }) {
	const { data, isLoading, isError, error } = useCustomers({ search });

	return (
		<div className="grid grid-cols-3 gap-2">
			{data?.map(customer => (
				<CustomerCard customer={customer} key={customer._id} />
			))}
			{isLoading && <Loading />}
			{isError && (
				<p>
					{(error as any)?.message ||
						'Ocurrio un error al recuperar los clientes'}
				</p>
			)}
		</div>
	);
}
