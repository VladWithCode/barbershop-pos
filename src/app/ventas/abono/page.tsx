'use client';
import Page from '@/app/_components/Page';
import Searchbar from '@/app/_components/Searchbar';
import React, { useState } from 'react';
import { useSales } from '../_services/sale.service';
import Loading from '@/app/_components/Loading/Loading';
import Link from 'next/link';

const formatter = Intl.DateTimeFormat('es-MX', {
	year: 'numeric',
	day: 'numeric',
	month: 'long',
});

export default function Abono() {
	const [search, setSearch] = useState('');
	const { data, isLoading, isError, error } = useSales({ search });

	return (
		<Page>
			<div className="col-span-6 px-4 py-2">
				<h1 className="text-xl font-medium">Abono</h1>
				<p className="text-zinc-500">
					Guardar un abono/pago a credito de compra
				</p>
				<div className="py-2" />
				<Searchbar onSearch={s => setSearch(s)} />
				<div className="py-2" />
				<div className="space-y-2">
					{data?.map(sale => (
						<Link
							href={'/ventas/abono/' + sale._id}
							className="flex bg-rose-950 px-2 py-1 rounded"
							key={sale._id}>
							<div className="flex flex-col h-full w-1/2 gap-1">
								<p className="font-medium truncate">
									{sale.customer_name}
								</p>
								<p className="text-xs text-rose-500">
									Fecha:
									<span className="pl-4">
										{formatter.format(
											new Date(sale.deposit_date)
										)}
									</span>
								</p>
							</div>
							<div className="my-auto text-sm">
								<p>
									Productos:{' '}
									<span className="pl-4 font-medium">
										{sale.items.length}
									</span>
								</p>
							</div>
							<div className="m-auto mr-0 px-4 font-bold text-sm">
								<p>
									{sale.payment_type === 'cash'
										? 'Contado'
										: 'Credito'}
								</p>
							</div>
						</Link>
					))}
					{isLoading && <Loading />}
					{isError && (
						<p>
							{(error as any)?.message ||
								'Ocurrio un error al recuperar los clientes'}
						</p>
					)}
				</div>
			</div>
		</Page>
	);
}
