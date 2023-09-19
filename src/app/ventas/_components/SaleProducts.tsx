import { numberToPrice } from '@/app/_utils/helpers';
import React from 'react';
import { Product } from '../_stores/useCreateSaleStore';
import Image from 'next/image';
import globals from '@/app/globals';

export default function SaleProducts({
	products,
	total,
	priceKey = 'sell_price_cash',
	handleAddClick,
	handleRemoveClick,
}: {
	products: Product[];
	total: number;
	priceKey?: 'sell_price_cash' | 'sell_price_credit';
	handleAddClick: () => void;
	handleRemoveClick: (id: string) => void;
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
			<div className="border-2 border-zinc-950 p-2 rounded grow flex flex-col gap-y-3">
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
							className="flex h-20 gap-x-4 overflow-hidden rounded"
							key={p._id}>
							<div className="h-full w-20 grow-0">
								{p.picture?.length > 0 ? (
									<Image
										className="h-full object-contain rounded"
										src={globals.API_BASE_URL + p.picture}
										width={120}
										height={120}
										alt={'Image of ' + p.name}
									/>
								) : (
									<div className="flex h-full m-auto">
										<svg className="m-auto w-10 h-10 fill-current">
											<use href="/sprites.svg#cologne"></use>
										</svg>
									</div>
								)}
							</div>
							<div className="pt-2 w-1/4">
								<p className="font-medium">{p.name}</p>
								<p className="text-sm">
									<span className="text-base">
										{numberToPrice(p[priceKey])}
									</span>{' '}
									&times;{p.qty}
								</p>
							</div>
							<div className="pt-2 w-1/4 m-auto text-center">
								<p className="text-xl font-semibold">
									{numberToPrice(p.qty * p[priceKey])}
									<span className="text-xs font-light pl-1">
										total
									</span>
								</p>
							</div>

							<div className="w-10 h-full flex flex-col ml-auto text-zinc-50">
								<button className="aspect-square h-1/2 flex bg-sky-600 hover:bg-sky-500">
									<svg className="aspect-square h-6 fill-current m-auto">
										<use href="/sprites.svg#pencil"></use>
									</svg>
								</button>
								<button
									className="aspect-square h-1/2 flex bg-red-500 hover:bg-red-400"
									onClick={() => handleRemoveClick(p._id)}>
									<svg className="aspect-square h-6 fill-current m-auto">
										<use href="/sprites.svg#bin"></use>
									</svg>
								</button>
							</div>
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
					<p className="text-xl">{numberToPrice(total)}</p>
				</div>
			</div>
		</div>
	);
}
