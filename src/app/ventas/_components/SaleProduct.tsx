'use client';
import React, { useState } from 'react';
import { Product } from '../_stores/useCreateSaleStore';
import Image from 'next/image';
import globals from '@/app/globals';
import { getClassName, numberToPrice } from '@/app/_utils/helpers';
import { motion } from 'framer-motion';
import ControlledInput from '@/app/_components/Forms/ControlledInput';

export function SaleProduct({
	product,
	priceKey,
	handleRemoveClick,
	handleUpdate,
}: {
	product: Product;
	priceKey: 'sell_price_cash' | 'sell_price_credit';
	handleRemoveClick: (id: string) => void;
	handleUpdate: (product: Product) => void;
}) {
	const [cardMode, setCardMode] = useState<'detail' | 'edit'>('detail');
	const [updatedQty, setUpdatedQty] = useState(product.qty);

	const handleEditClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		setCardMode(prev => (prev === 'detail' ? 'edit' : 'detail'));

		if (cardMode === 'edit' && updatedQty !== product.qty)
			handleUpdate({ ...product, qty: updatedQty });
	};

	return (
		<motion.div className="h-20 overflow-hidden rounded" key={product._id}>
			<div className="h-full flex gap-x-4">
				<div className="w-20 grow-0">
					{product.picture?.length > 0 ? (
						<Image
							className="h-full object-contain rounded"
							src={globals.API_BASE_URL + product.picture}
							width={120}
							height={120}
							alt={'Image of ' + product.name}
						/>
					) : (
						<div className="flex h-full m-auto">
							<svg className="m-auto w-10 h-10 fill-current">
								<use href="/sprites.svg#cologne"></use>
							</svg>
						</div>
					)}
				</div>
				<div className="pt-2 w-2/4 space-y-1">
					<p className="font-medium truncate">{product.name}</p>
					{cardMode === 'detail' ? (
						<p className="text-sm">
							<span className="text-base">
								{numberToPrice(product[priceKey])}
							</span>{' '}
							&times;{product.qty}
						</p>
					) : (
						<div className="flex gap-x-4 w-full">
							<p className="shrink basis-auto">
								{numberToPrice(product[priceKey])}
							</p>

							<div className="flex flex-auto text-zinc-50">
								<button
									className="w-7 aspect-square bg-zinc-800 px-2 rounded-s"
									type="button"
									onClick={() =>
										setUpdatedQty(prev =>
											prev === 0 ? 0 : prev - 1
										)
									}>
									&minus;
								</button>
								<div className="w-10 h-7">
									<ControlledInput
										name={product._id + '-qty'}
										value={updatedQty}
										onChange={e =>
											setUpdatedQty(
												parseInt(e.target.value)
											)
										}
										type="number"
										className="w-full h-full text-center appearance-none bg-zinc-600 border-b-transparent focus:border-transparent focus:rounded-none focus:bg-zinc-600"
									/>
								</div>
								<button
									className="w-7 aspect-square bg-zinc-800 px-2 rounded-e"
									onClick={() =>
										setUpdatedQty(prev => prev + 1)
									}>
									&#43; {/* plus sign */}
								</button>
							</div>
						</div>
					)}
				</div>
				<div className="pt-2 w-1/4 m-auto text-center">
					<p className="text-xl font-semibold">
						{numberToPrice(product.qty * product[priceKey])}
						<span className="text-xs font-light pl-1">total</span>
					</p>
				</div>

				<div className="w-10 h-full flex flex-col ml-auto text-zinc-50">
					<button
						className={getClassName(
							'aspect-square h-1/2 flex',
							cardMode === 'edit'
								? 'bg-emerald-600'
								: 'bg-sky-600'
						)}
						onClick={handleEditClick}>
						<svg className="aspect-square h-6 fill-current m-auto">
							<use
								href={`/sprites.svg#${
									cardMode === 'edit' ? 'check' : 'pencil'
								}`}></use>
						</svg>
					</button>
					<button
						className="aspect-square h-1/2 flex bg-red-500 hover:bg-red-400"
						onClick={() => handleRemoveClick(product._id)}>
						<svg className="aspect-square h-6 fill-current m-auto">
							<use href="/sprites.svg#bin"></use>
						</svg>
					</button>
				</div>
			</div>
		</motion.div>
	);
}
