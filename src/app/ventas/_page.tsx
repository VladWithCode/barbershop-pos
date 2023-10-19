'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Page from '../_components/Page';
import Searchbar from '../_components/Searchbar';
import SaleListing from './_components/SaleListing';

export default function Ventas() {
	const [customerName, setCustomerName] = useState('');

	return (
		<Page>
			<div className="flex flex-col col-span-6 px-4 py-2 overflow-hidden">
				<h1 className="text-lg font-medium">Ventas</h1>
				<p className="text-zinc-500">Listado de ventas</p>
				<div className="py-2" />
				<Searchbar onSearch={s => setCustomerName(s)} />
				<div className="py-2" />

				<div className="flex-auto overflow-y-auto custom-scroll-bar pr-1">
					<SaleListing search={customerName} />
				</div>
			</div>

			<div className="col-span-6 px-4 py-2">
				<h2 className="text-lg text-right">Acciones</h2>
				<div className="py-2" />
				<div className="flex flex-wrap gap-2 w-fit ml-auto text-zinc-50">
					<Link
						className="flex flex-col justify-center items-center aspect-square w-32 text-center text-zinc-300 bg-rose-950 p-1 rounded"
						href="/ventas/nueva">
						<svg className="w-8 h-8 fill-current mx-auto xl:w-12 xl:h-12">
							<use href="/sprites.svg#plus"></use>
						</svg>
						<p className="text-xs font-bold xl:text-md">Nueva</p>
					</Link>

					<Link
						className="flex flex-col justify-center items-center aspect-square w-32 text-center text-zinc-300 bg-rose-950 p-1 rounded"
						href="/ventas/abono">
						<svg className="w-8 h-8 fill-current mx-auto xl:w-12 xl:h-12">
							<use href="/sprites.svg#bill"></use>
						</svg>
						<p className="text-xs font-bold xl:text-md">Abono</p>
					</Link>
				</div>
			</div>
		</Page>
	);
}
