import Link from 'next/link';
import React from 'react';

function ActionsMenu() {
	return (
		<div className="w-full px-8 pt-2 overflow-hidden overflow-x-auto mb-6">
			<h4 className="text-md font-normal mb-2">Productos</h4>
			<div className="flex gap-x-3 text-zinc-50">
				<Link
					className="flex flex-col justify-center items-center aspect-square w-16 text-center bg-barber-red p-1 rounded"
					href="/inventario">
					<svg className="w-8 h-8 fill-zinc-50 mx-auto">
						<use href="/sprites.svg#clipboard"></use>
					</svg>
					<p className="text-xs font-bold">Inv.</p>
				</Link>

				<Link
					className="flex flex-col justify-center items-center aspect-square w-16 text-center bg-barber-red p-1 rounded"
					href="/productos/crear">
					<svg className="w-8 h-8 fill-zinc-50 mx-auto">
						<use href="/sprites.svg#plus"></use>
					</svg>
					<p className="text-xs font-bold">Crear</p>
				</Link>

				<Link
					className="flex flex-col items-center justify-center aspect-square w-16 text-center bg-barber-red p-1 rounded"
					href="/productos/eliminar">
					<svg className="w-8 h-8 fill-zinc-50 mx-auto">
						<use href="/sprites.svg#bin"></use>
					</svg>
					<p className="text-xs font-bold">Eliminar</p>
				</Link>

				<Link
					href="/productos/categorias"
					className="flex flex-col item-center justify-center aspect-square w-16 text-center bg-barber-red p-1 rounded break-words overflow-hidden">
					{/* <svg className="w-8 h-8 fill-zinc-50 mx-auto">
							<use href="/sprites.svg#bin"></use>
						</svg> */}
					<p className="text-xs font-bold w-[6ch] mx-auto">
						Categorías
					</p>
				</Link>
			</div>
		</div>
	);
}

export default ActionsMenu;
