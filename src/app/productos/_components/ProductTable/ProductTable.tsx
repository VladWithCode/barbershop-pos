import { getClassName } from '@/app/_utils/helpers';
import React from 'react';
import ProductElement from './ProductElement';

type ProductTableProps = {
	productListing: any[];
	className?: string;
	title?: string;
	headless?: boolean;
};

const TEST_PRODUCTS = [
	{
		_id: '1',
		name: 'Producto de Prueba 1',
		sell_price_cash: 100,
		sale_units: 1,
		picture: 'has',
	},
	{
		_id: '2',
		name: 'Producto de Prueba 2',
		sell_price_cash: 200,
		sale_units: 1,
		picture: '',
	},
	{
		_id: '3',
		name: 'Producto de Prueba 3',
		sell_price_cash: 300,
		sale_units: 1,
		picture: 'has',
	},
	{
		_id: '4',
		name: 'Producto de Prueba 4',
		sell_price_cash: 400,
		sale_units: 1,
		picture: 'has',
	},
	{
		_id: '5',
		name: 'Producto de Prueba 5',
		sell_price_cash: 500,
		sale_units: 1,
		picture: '',
	},
];

export default function ProductTable({
	productListing,
	className,
	...props
}: ProductTableProps) {
	return (
		<div
			className={getClassName(
				'max-w-3xl relative bg-zinc-300 p-4 rounded text-zinc-950',
				className
			)}>
			{!props.headless ? (
				<h3 className="text-lg font-medium pb-4">
					{props.title || 'Productos'}
				</h3>
			) : null}

			<div className="h-96 space-y-4 overflow-hidden overflow-y-auto custom-scroll-bar scrol">
				{TEST_PRODUCTS.map(p => (
					<ProductElement product={p} key={p._id} />
				))}
			</div>
		</div>
	);
}
