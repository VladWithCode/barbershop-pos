'use client';
import InputGroup, { TextArea, ImageInput } from '@/app/_components/InputGroup';
import React, { useCallback } from 'react';
import type {
	useCreateProduct,
	useUploadPicture,
} from '../../_hooks/useProductMutations';
import useForm from '@/app/_hooks/useForm';
import { LabelledControlledInput } from '@/app/_components/Forms/ControlledInput';

function CreateForm({
	createProduct,
	uploadPicture,
	onSubmit,
}: {
	onSubmit: (data: any) => void;
	createProduct?: ReturnType<typeof useCreateProduct>;
	uploadPicture?: ReturnType<typeof useUploadPicture>;
}) {
	const [fields, onChange, setField, reset] = useForm({
		name: '',
		description: '',
		category: '',
		buy_price: 0,
		sell_price_cash: 0,
		sell_price_credit: 0,
		sale_units: 0,
		supply_units: 0,
		picture: null,
	});

	const _onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
		e => {
			e.preventDefault();

			const productData = {
				...fields,
			};

			if (typeof onSubmit === 'function') {
				onSubmit(productData);
			}

			reset();
		},
		[onSubmit, fields]
	);

	return (
		<form
			onSubmit={_onSubmit}
			className="w-full max-w-lg bg-zinc-300 rounded px-6 py-4 text-zinc-950 space-y-4">
			<InputGroup
				label="Nombre"
				name="name"
				value={fields.name}
				onChange={onChange}
			/>
			<LabelledControlledInput
				label="Descripcion"
				name="description"
				value={fields.description}
				onChange={onChange}
			/>
			<InputGroup
				label="Categoría"
				name="category"
				value={fields.category}
				onChange={onChange}
			/>
			<InputGroup
				label="Precio de compra"
				name="buy_price"
				type="number"
				value={fields.buy_price}
				onChange={onChange}
			/>
			<div className="flex gap-x-2 w-full justify-between">
				<div className="w-1/2 shrink">
					<InputGroup
						label="Precio (credito)"
						name="sell_price_credit"
						type="number"
						value={fields.sell_price_credit}
						onChange={onChange}
					/>
				</div>
				<div className="w-1/2 shrink">
					<InputGroup
						label="Precio (contado)"
						name="sell_price_cash"
						type="number"
						value={fields.sell_price_cash}
						onChange={onChange}
					/>
				</div>
			</div>
			<div className="flex gap-x-2 w-full justify-between">
				<div className="w-1/2 shrink">
					<InputGroup
						label="Unidades (venta)"
						name="sale_units"
						type="number"
						value={fields.sale_units}
						onChange={onChange}
					/>
				</div>
				<div className="w-1/2 shrink">
					<InputGroup
						label="Unidades (insumo)"
						name="supply_units"
						type="number"
						value={fields.supply_units}
						onChange={onChange}
					/>
				</div>
			</div>
			<ImageInput
				label="Arrastra la imagen o haz click aquí"
				name="picture"
				className="w-1/2"
				val={fields.picture}
				onChange={e => {
					const { files } = e.target;
					if (!files) return;
					const file = files[0];
					setField('picture', file);
				}}
			/>
			<button
				type="submit"
				className="w-full py-2 bg-zinc-800 text-zinc-50 rounded hover:bg-zinc-700">
				Guardar Producto
			</button>
		</form>
	);
}

export default CreateForm;
