'use client';
import { useParams } from 'next/navigation';
import React from 'react';
import { useSale } from '../_hooks/useSale';
import Page from '@/app/_components/Page';
import { numberToPrice } from '@/app/_utils/helpers';

const formatter = Intl.DateTimeFormat('es-mx', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});

export default function Venta() {
	const { id } = useParams();
	const { data, isLoading, isError, error } = useSale(id as string);

	return (
		<Page>
			<div className="col-span-6">
				<h1 className="text-xl font-medium">Venta</h1>
				<p className="text-zinc-500">Detalles de venta</p>
				<div className="py-2" />

				{data ? (
					<div className="bg-zinc-300 px-4 py-2 rounded space-y-2 text-zinc-950">
						<div className="flex">
							<div className="flex flex-col basis-1/2">
								<p className="text-xs font-medium uppercase">
									Nombre
								</p>
								<p>{data.customer_name}</p>
							</div>
							<div className="flex flex-col basis-1/2">
								<p className="text-xs font-medium uppercase">
									Tipo de pago
								</p>
								<p>
									{data.payment_type === 'cash'
										? 'Contado'
										: 'Credito'}
								</p>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex flex-col shrink">
								<p className="text-xs font-medium uppercase">
									Total a Pagar
								</p>
								<p>{numberToPrice(data.total_amount / 100)}</p>
							</div>
							<div className="flex flex-col shrink">
								<p className="text-xs font-medium uppercase">
									$ / Quincena
								</p>
								<p>{numberToPrice(data.installment / 100)}</p>
							</div>
							<div className="flex flex-col shrink">
								<p className="text-xs font-medium uppercase">
									Cantidad Abonada
								</p>
								<p>{numberToPrice(data.paid_amount / 100)}</p>
							</div>
							<div className="flex flex-col shrink">
								<p className="text-xs font-medium uppercase">
									Cantidad Pendiente
								</p>
								<p>
									{numberToPrice(data.pending_amount / 100)}
								</p>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex flex-col shrink">
								<p className="text-xs font-medium uppercase">
									Fecha de siguiente pago
								</p>
								<p>
									{data.next_payment_date
										? formatter.format(
												new Date(data.next_payment_date)
										  )
										: 'No se espera otro pago'}
								</p>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</Page>
	);
}
