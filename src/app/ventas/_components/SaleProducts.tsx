import { numberToPrice } from '@/app/_utils/helpers';
import React from 'react';
import { Product } from '../_stores/useCreateSaleStore';

export default function SaleProducts({
	products,
	total,
	handleAddClick,
}: {
	products: Product[];
	total: number;
	handleAddClick: () => void;
}) {
	return (
		<div className="w-2/5 flex flex-col h-fit gap-y-2 mx-auto py-2 px-4 bg-zinc-300 text-zinc-950 rounded">
			<div className="flex justify-between">
				<h3 className="text-lg font-medium">Productos</h3>
				<button
					className="bg-zinc-800 text-zinc-50 py-1 px-4 rounded hover:bg-zinc-700"
					onClick={handleAddClick}>
					Agregar producto
				</button>
			</div>
			<div className="border-2 border-zinc-950 p-2 rounded grow flex flex-col">
				{products.length === 0 ? (
					<button
						className="flex flex-col items-center justify-center text-center text-zinc-500 w-full h-full py-12 rounded hover:bg-zinc-400 hover:text-zinc-800"
						onClick={handleAddClick}>
						<svg className="w-10 h-10 fill-current">
							<use href="/sprites.svg#plus"></use>
						</svg>
						<p className="text-sm text-center">
							Haz clic para agregar productos
						</p>
					</button>
				) : (
					products.map(p => (
						<div
							className="flex items-center justify-between"
							key={p._id}>
							<p className="text-sm">{p.name}</p>
							<p className="text-sm">x {p.qty}</p>
							{/* <p className="text-sm">
										{numberToPrice(p / 100)}
									</p> */}
						</div>
					))
				)}
			</div>
			<div className="w-full">
				<div className="flex justify-between">
					<p className="text-lg font-medium">Total:</p>
					<p className="text-xl">{numberToPrice(total / 100)}</p>
				</div>
			</div>
		</div>
	);
}
