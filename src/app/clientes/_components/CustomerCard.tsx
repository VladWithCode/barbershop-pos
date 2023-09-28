import Link from 'next/link';
import React from 'react';
import { Customer } from '../_services/CustomerService';

export default function CustomerCard({
	customer,
}: {
	customer: Customer & { _id: string };
}) {
	return (
		<div className="flex bg-rose-950 w-48 backdrop-blur-sm rounded py-1 px-2 justify-between group ">
			<div className="grow shrink-0">
				<p className="font-medium">{customer.fullname}</p>
				<p className="text-xs font-light text-zinc-300">
					{customer.phone}
				</p>
			</div>
			<div className="shrink grow-0 flex items-center gap-x-2 text-rose-400 opacity-0 group-hover:opacity-100">
				<Link
					href={'/clientes/' + customer._id}
					className="btn btn-sm btn-primary hover:text-zinc-50"
					title="Ver">
					<svg className="w-5 h-5 fill-current">
						<use href="/sprites.svg#view"></use>
					</svg>
				</Link>

				<Link
					href={'/clientes/editar/' + customer._id}
					className="btn btn-sm btn-primary hover:text-zinc-50"
					title="Editar">
					<svg className="w-3.5 h-3.5 fill-current">
						<use href="/sprites.svg#pencil"></use>
					</svg>
				</Link>
			</div>
		</div>
	);
}
