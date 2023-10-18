import React from 'react';
import { Sale, useSales } from '../_services/sale.service';
import Loading from '@/app/_components/Loading/Loading';
import Link from 'next/link';

const formatter = Intl.DateTimeFormat('es-MX', {
	year: 'numeric',
	day: 'numeric',
	month: 'long',
});

function SaleListing({ search }: { search: string }) {
	const { data, isLoading, isError, error } = useSales({ search });

	return (
		<div className="space-y-2">
			{data?.map(sale => (
				<SaleCard sale={sale} />
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

export default SaleListing;

function SaleCard({ sale }: { sale: Sale }) {
	return (
		<Link
			href={'/ventas/' + sale._id}
			className="flex bg-rose-950 px-2 py-1 rounded">
			<div className="flex flex-col h-full w-1/2 gap-1">
				<p className="font-medium truncate">{sale.customer_name}</p>
				<p className="text-xs text-rose-500">
					Fecha:
					<span className="pl-4">
						{formatter.format(new Date(sale.deposit_date))}
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
				<p>{sale.payment_type === 'cash' ? 'Contado' : 'Credito'}</p>
			</div>
		</Link>
	);
}
