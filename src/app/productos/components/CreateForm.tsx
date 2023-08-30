'use client';

import { useCallback, ChangeEvent } from 'react';
import useCreateProductStore from '../stores/useCreateProductStore';
import InputGroup from '@/app/components/InputGroup';

export default function CreateForm() {
	const {
		name,
		description,
		buy_price,
		sell_price_cash,
		sell_price_credit,
		category,
		sale_units,
		supply_units,
		setField,
	} = useCreateProductStore(state => state);
	const onInputChangeCb = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { target } = e;
			const value =
				target.type === 'number'
					? parseFloat(target.value)
					: target.value;

			setField(target.name, value);
		},
		[setField]
	);

	return (
		<form
			className="bg-gray-300 py-3 px-8 mx-auto rounded-md shadow-sm shadow-zinc-400 space-y-4"
			onSubmit={async e => {
				e.preventDefault();

				const response = await fetch('http://localhost:3000/products', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name,
						description,
						buy_price,
						sell_price_cash,
						sell_price_credit,
						category,
						sale_units,
						supply_units,
					}),
				});

				if (!response.ok) return alert('Error creando productos');

				alert('Producto creado con exito');
			}}>
			<InputGroup
				label="Nombre"
				name="name"
				value={name}
				onChange={onInputChangeCb}
			/>
			<InputGroup
				label="Descripción"
				name="description"
				value={description}
				onChange={onInputChangeCb}
			/>
			<div className="flex gap-x-4">
				<InputGroup
					label="Categoria"
					name="category"
					value={category}
					onChange={onInputChangeCb}
				/>
				<InputGroup
					label="Precio de Compra"
					name="buy_price"
					type="number"
					value={buy_price}
					onChange={onInputChangeCb}
				/>
			</div>
			<div className="flex gap-x-4">
				<InputGroup
					label="Precio de Venta (contado)"
					name="sell_price_cash"
					type="number"
					value={sell_price_cash}
					onChange={onInputChangeCb}
				/>
				<InputGroup
					label="Precio de Venta (crédito)"
					name="sell_price_credit"
					type="number"
					value={sell_price_credit}
					onChange={onInputChangeCb}
				/>
			</div>
			<div className="flex gap-x-4">
				<InputGroup
					label="Unidades para venta"
					name="sale_units"
					type="number"
					value={sale_units}
					onChange={onInputChangeCb}
				/>
				<InputGroup
					label="Unidades para insumo"
					name="supply_units"
					type="number"
					value={supply_units}
					onChange={onInputChangeCb}
				/>
			</div>
			<div className="flex justify-end">
				<button
					type="submit"
					className="px-4 py-2 rounded-sm bg-sky-800 text-zinc-50">
					Registrar
				</button>
			</div>
		</form>
	);
}
