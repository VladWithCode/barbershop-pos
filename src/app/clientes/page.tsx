'use client';
import Link from 'next/link';
import React from 'react';
import CustomerListing from './_components/CustomerListing';
import Searchbar from '../_components/Searchbar';
import Page from '../_components/Page';

export default function Clientes() {
	const [search, setSearch] = React.useState('');

	return (
		<Page>
			{/* Customer List */}
			<div className="flex flex-col col-span-8 px-2 py-4 overflow-hidden">
				<h1 className="text-xl font-medium">Clientes</h1>
				<p className="text-zinc-500">Lista de clientes registrados</p>
				<div className="py-2" />
				<Searchbar
					onSearch={s => setSearch(s)}
					placeholder="Buscar cliente..."
				/>
				<div className="py-2" />
				<div className="flex-auto overflow-y-auto custom-scroll-bar pr-1">
					<CustomerListing search={search} />
				</div>
			</div>

			{/* Action List */}
			<div className="col-span-4 px-2 py-4">
				<h2 className="text-lg text-right">Acciones</h2>
				<div className="py-2"></div>
				<div className="flex flex-wrap gap-2 w-fit ml-auto text-zinc-50">
					<Link
						href="/clientes/crear"
						className="flex flex-col bg-rose-950 w-32 aspect-square rounded py-1 px-2 items-center justify-center gap-y-2 group hover:bg-rose-900">
						<svg className="w-12 h-12 fill-current">
							<use href="/sprites.svg#plus"></use>
						</svg>
						<p className="text-sm font-medium">Nuevo Cliente</p>
					</Link>

					<Link
						href="/clientes/registro"
						className="flex flex-col bg-rose-950 w-32 aspect-square rounded py-1 px-2 items-center justify-center gap-y-2 group hover:bg-rose-900">
						<svg className="w-12 h-12 fill-current">
							<use href="/sprites.svg#customers"></use>
						</svg>
						<p className="text-sm font-medium">Registro Masivo</p>
					</Link>

					<Link
						href="/clientes/eliminar"
						className="flex flex-col bg-rose-950 w-32 aspect-square rounded py-1 px-2 items-center justify-center gap-y-2 group hover:bg-rose-900">
						<svg className="w-8 h-8 fill-current">
							<use href="/sprites.svg#bin"></use>
						</svg>
						<p className="text-sm font-medium text-center">
							Eliminación Masiva
						</p>
					</Link>
				</div>
			</div>
		</Page>
	);
}
