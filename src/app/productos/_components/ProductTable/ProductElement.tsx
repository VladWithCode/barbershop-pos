import { numberToPrice } from '@/app/_utils/helpers';
import Image from 'next/image';
import React, { useMemo } from 'react';

export default function ProductElement({
	product,
	handleEditClick,
	handleRemoveClick,
}: {
	product: any;
	handleEditClick: () => void;
	handleRemoveClick: () => void;
}) {
	const { price, qty } = useMemo(() => {
		if (product.sell_price_cash && product.sale_units)
			return { price: product.sell_price_cash, qty: product.sale_units };

		let price = 0;
		let qty = 0;

		for (let stk of product.stocks) {
			if (stk._id === product.default_sale_stock_id) {
				price = stk.sell_price_cash;
				qty = stk.sale_units;
				break;
			}
		}

		return { price, qty };
	}, []);

	return (
		<div className="flex h-24 relative bg-zinc-200 rounded overflow-hidden">
			{product.picture?.length > 0 ? (
				<div className="shrink my-auto px-6">
					<svg className="w-12 h-12 fill-current">
						<use href="/sprites.svg#cologne"></use>
					</svg>
				</div>
			) : (
				<div className="shrink h-full aspect-square">
					<Image
						className="object-contain w-full h-full"
						height={96}
						width={96}
						src={product.picture}
						// src="/placeholder.webp"
						alt={'Image of ' + product.name}></Image>
				</div>
			)}
			<div className="w-1/2 h-full px-1 py-2">
				<p className="font-medium h-1/2 truncate">{product.name}</p>
				<p className="text-sky-700 h-1/2">Ver detalles</p>
			</div>

			<div className="shrink-0 w-32 h-full flex flex-col mx-auto py-2 items-center justify-center">
				<p className="text-lg text-zinc-950 font-medium">
					{numberToPrice(price)}
				</p>
				<p className="text-sm text-zinc-700 font-medium">
					&times; {qty}
				</p>
			</div>

			{/* This must be the last element */}
			<div className="flex flex-col h-full w-10 ml-auto shrink-0 grow-0">
				<button className="flex basis-1/2 bg-sky-600 text-zinc-50 hover:bg-sky-700">
					<svg className="w-6 h-6 m-auto fill-current">
						<use href="/sprites.svg#pencil"></use>
					</svg>
				</button>

				<button className="flex basis-1/2 bg-rose-600 text-zinc-50 hover:bg-rose-700">
					<svg className="w-6 h-6 m-auto fill-current">
						<use href="/sprites.svg#bin"></use>
					</svg>
				</button>
			</div>
		</div>
	);
}
