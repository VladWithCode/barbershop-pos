import Link from 'next/link';
import React from 'react';

function ActionsMenu() {
	return (
		<div className="grid grid-cols-3 justify-between gap-1 text-zinc-50">
			<Link
				className="flex flex-col gap-y-2 justify-center items-center aspect-square w-32 text-center bg-rose-950 p-1 rounded hover:bg-rose-950 hover:scale-105 lg:w-32"
				href="/productos/entrada">
				<svg className="w-12 h-12 fill-zinc-50 mx-auto">
					<use href="/sprites.svg#clipboard"></use>
				</svg>
				<p className="text-sm font-bold">Entrada Inv.</p>
			</Link>

			<Link
				className="flex flex-col gap-y-2 justify-center items-center aspect-square w-32 text-center bg-rose-950 p-1 rounded hover:bg-zinc-950 hover:scale-105 lg:w-32"
				href="/productos/crear">
				<svg className="w-12 h-12 fill-zinc-50 mx-auto">
					<use href="/sprites.svg#plus"></use>
				</svg>
				<p className="text-sm font-bold">Crear</p>
			</Link>

			<Link
				className="flex flex-col gap-y-2 items-center justify-center aspect-square w-32 text-center bg-rose-950 p-1 rounded hover:bg-zinc-950 hover:scale-105 lg:w-32"
				href="/productos/eliminar">
				<svg className="w-12 h-12 fill-zinc-50 mx-auto">
					<use href="/sprites.svg#bin"></use>
				</svg>
				<p className="text-sm font-bold">Eliminar</p>
			</Link>

			<Link
				href="/productos/categorias"
				className="flex flex-col item-center justify-center aspect-square w-32 text-center bg-rose-950 p-1 rounded break-words overflow-hidden hover:bg-zinc-950 hover:scale-105 lg:w-32">
				{/* <svg className="w-8 h-8 fill-zinc-50 mx-auto">
							<use href="/sprites.svg#bin"></use>
						</svg> */}
				<p className="text-sm font-bold w-[6ch] mx-auto lg:w-auto">
					Categorías
				</p>
			</Link>
		</div>
	);
}

export default ActionsMenu;
