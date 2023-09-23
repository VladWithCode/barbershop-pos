import Link from 'next/link';
import React from 'react';

const TEST_USERS = [
	{
		id: 'cus-1',
		name: 'Juan Perez',
		dob: '2002-01-02',
		phone: '618-123-4567',
	},
	{
		id: 'cus-2',
		name: 'Maria Lopez',
		dob: '1999-05-12',
		phone: '618-123-4567',
	},
	{
		id: 'cus-3',
		name: 'Leon Juarez',
		dob: '1972-12-02',
		phone: '618-123-4567',
	},
];

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
					<div className="py-2"></div>
					<div className="flex flex-wrap gap-2">
						{TEST_USERS.map(user => (
							<div className="flex bg-zinc-100 bg-opacity-10 w-48 backdrop-blur-sm rounded py-1 px-2 justify-between group hover:bg-opacity-20">
								<div className="grow shrink-0">
									<p className="font-medium">{user.name}</p>
									<p className="text-xs font-light text-zinc-300">
										{user.phone}
									</p>
								</div>
								<div className="shrink grow-0 flex items-center gap-x-2 text-zinc-400 opacity-0 group-hover:opacity-100">
									<Link
										href={'/clientes/' + user.id}
										className="btn btn-sm btn-primary hover:text-zinc-50"
										title="Ver">
										<svg className="w-5 h-5 fill-current">
											<use href="/sprites.svg#view"></use>
										</svg>
									</Link>

									<Link
										href={'/clientes/editar/' + user.id}
										className="btn btn-sm btn-primary hover:text-zinc-50"
										title="Editar">
										<svg className="w-3.5 h-3.5 fill-current">
											<use href="/sprites.svg#pencil"></use>
										</svg>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Action List */}
				<div className="col-span-6 px-2 py-4">
					<h2 className="text-lg text-right">Acciones</h2>
					<div className="py-2"></div>
					<div className="flex flex-wrap gap-2 w-fit ml-auto text-rose-950">
						<Link
							href="/clientes/crear"
							className="flex flex-col bg-zinc-300 w-32 aspect-square rounded py-1 px-2 items-center justify-center gap-y-2 group hover:bg-zinc-200 hover:text-rose-900">
							<svg className="w-12 h-12 fill-current">
								<use href="/sprites.svg#plus"></use>
							</svg>
							<p className="text-sm font-medium">Nuevo Cliente</p>
						</Link>

						<Link
							href="/clientes/registro"
							className="flex flex-col bg-zinc-300 w-32 aspect-square rounded py-1 px-2 items-center justify-center gap-y-2 group hover:bg-zinc-200 hover:text-rose-900">
							<svg className="w-12 h-12 fill-current">
								<use href="/sprites.svg#customers"></use>
							</svg>
							<p className="text-sm font-medium">
								Registro Masivo
							</p>
						</Link>

						<Link
							href="/clientes/eliminar"
							className="flex flex-col bg-zinc-300 w-32 aspect-square rounded py-1 px-2 items-center justify-center gap-y-2 group hover:bg-zinc-200 hover:text-rose-900">
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
