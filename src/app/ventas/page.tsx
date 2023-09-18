import Link from 'next/link';
import React from 'react';

export default function Ventas() {
	return (
		<div className="w-full h-page">
			<div className="w-full px-8 pt-2 overflow-hidden overflow-x-auto mb-6">
				<h4 className="text-md font-normal mb-2">Ventas</h4>
				<div className="flex gap-x-3 text-zinc-50 xl:gap-x-4">
					<Link
						className="flex flex-col justify-center items-center aspect-square w-16 text-center text-rose-950 bg-zinc-300 p-1 rounded xl:w-24"
						href="/ventas/nueva">
						<svg className="w-8 h-8 fill-current mx-auto xl:w-12 xl:h-12">
							<use href="/sprites.svg#plus"></use>
						</svg>
						<p className="text-xs font-bold xl:text-md">Nueva</p>
					</Link>

					<Link
						className="flex flex-col justify-center items-center aspect-square w-16 text-center text-rose-950 bg-zinc-300 p-1 rounded xl:w-24"
						href="/abono">
						<svg className="w-8 h-8 fill-current mx-auto xl:w-12 xl:h-12">
							<use href="/sprites.svg#bill"></use>
						</svg>
						<p className="text-xs font-bold xl:text-md">Abono</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
