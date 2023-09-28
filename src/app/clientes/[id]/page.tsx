'use client';

import React from 'react';
import { useCustomerById } from '../_hooks/useCustomers';
import { useParams } from 'next/navigation';

export default function Cliente() {
	const { id } = useParams();
	const { data, isLoading, isError, error } = useCustomerById(id as string);

	return (
		<div className="h-page py-2 max-w-screen-xl grid grid-cols-12 auto-rows-fr mx-auto gap-x-2 overflow-hidden">
			<div className="col-span-12 px-2 py-4">
				<h1 className="text-xl font-medium">Perfil de Cliente</h1>
				<p className="text-zinc-500">Datos y detalles del cliente</p>
			</div>
			<div className="col-span-6">{}</div>
		</div>
	);
}
