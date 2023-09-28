import Link from 'next/link';
import React from 'react';
import CustomerListing from './_components/CustomerListing';

export default function Clientes() {
	return (
		<div className="h-page py-2">
			<div className="h-full max-w-screen-xl grid grid-cols-12 auto-rows-fr justify-between mx-auto gap-x-2 overflow-hidden">
				{/* Customer List */}
				<div className="col-span-6 px-2 py-4">
					<h1 className="text-xl font-medium">Clientes</h1>
					<p className="text-zinc-500">
						Lista de clientes registrados
					</p>
					<div className="py-2">
						<CustomerListing />
					</div>
				</div>

				{/* Action List */}
				<div className="col-span-6 px-2 py-4">
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
							<p className="text-sm font-medium">
								Registro Masivo
							</p>
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
			</div>
		</div>
	);
}
