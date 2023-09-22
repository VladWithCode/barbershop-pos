import { getClassName } from '@/app/_utils/helpers';
import React, { useState } from 'react';
import ProductElement from './ProductElement';
import EditProductForm from '../Forms/EditProductForm';

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
	/* 	{
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
	}, */
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

			<div className="relative h-96 space-y-4 overflow-hidden overflow-y-auto custom-scroll-bar">
				{productListing.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full">
						<p className="text-zinc-500 font-medium">
							Aun no has agregado productos
						</p>
					</div>
				) : null}
				{TEST_PRODUCTS.map(p => (
					// <ListElement product={p} key={p._id} />
					<EditProductElement product={p} />
				))}
			</div>
		</div>
	);
}

function ListElement({ product }: { product: any }) {
	const [isEditing, setIsEditing] = useState(false);

	return <div className="relatve"></div>;
}

function EditProductElement({ product }: { product: any }) {
	return (
		<div className="absolute inset-0 w-full h-full flex items-center justify-center">
			<EditProductForm product={product} handleEdit={console.log} />
		</div>
	);
}
