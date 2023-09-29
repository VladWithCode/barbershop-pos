'use client';

import React from 'react';
import CustomerCard from './CustomerCard';
import { useCustomers } from '../_hooks/useCustomers';
import Loading from '@/app/_components/Loading/Loading';

const TEST_USERS = [
	{
		_id: 'cus-1',
		fullname: 'Juan Perez',
		dob: '2002-01-02',
		phone: '618-123-4567',
	},
	{
		_id: 'cus-2',
		fullname: 'Maria Lopez',
		dob: '1999-05-12',
		phone: '618-123-4567',
	},
	{
		_id: 'cus-3',
		fullname: 'Leon Juarez',
		dob: '1972-12-02',
		phone: '618-123-4567',
	},
];

export default function CustomerListing() {
	const { data, isLoading, isError, error } = useCustomers();

	return (
		<div className="grid grid-cols-3 gap-2">
			{/* 			{TEST_USERS.map(customer => (
				<CustomerCard customer={customer} />
			))} */}
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
