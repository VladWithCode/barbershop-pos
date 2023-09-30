import React from 'react';
import { CustomerDoc } from '../_services/CustomerService';
import { getClassName } from '@/app/_utils/helpers';

const dateFormater = new Intl.DateTimeFormat('es-MX', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});

export default function CustomerDetail({
	customer,
	className,
}: {
	customer: CustomerDoc;
	className?: string;
}) {
	return (
		<div
			className={getClassName(
				'bg-zinc-300 rounded py-2 px-4 space-y-2 text-zinc-950',
				className
			)}>
			<div className="flex gap-x-1">
				<div className="flex flex-col w-1/2">
					<p className="text-zinc-600 text-sm">Nombre</p>
					<p className="font-medium">{customer.fullname}</p>
				</div>
				<div className="flex flex-col w-1/2">
					<p className="text-zinc-600 text-sm">Telefono</p>
					<p className="font-medium">{customer.phone}</p>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="text-zinc-600 text-sm">Fecha de cumpleaños</div>
				<p className="font-medium">
					{customer.dob
						? dateFormater.format(new Date(customer.dob))
						: 'N/A'}
				</p>
			</div>
			<div className="flex gap-x-1">
				<div className="flex flex-col w-1/2">
					<p className="text-zinc-600 text-sm">Red Social</p>
					<p className="capitalize font-medium">
						{customer.social_media || 'Sin definir'}
					</p>
				</div>
				<div className="flex flex-col w-1/2">
					<p className="text-zinc-600 text-sm">Usuario</p>
					<p className="font-medium">
						{customer.social_media_name || 'Sin definir'}
					</p>
				</div>
			</div>
			<div className="flex flex-col">
				<p className="text-zinc-600 text-sm">Dirección</p>
				<p className="font-medium">
					{customer.address || 'Sin definir'}
				</p>
			</div>
		</div>
	);
}
