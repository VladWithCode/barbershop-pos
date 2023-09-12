import InputGroup, { TextArea, ImageInput } from '@/app/_components/InputGroup';
import React, { useCallback } from 'react';
import useCreateProductStore from '../../_stores/useCreateProductStore';
import type {
	useCreateProduct,
	useUploadPicture,
} from '../../_hooks/useProductMutations';

function CreateForm({
	createProduct,
	uploadPicture,
	onSubmit,
}: {
	createProduct: ReturnType<typeof useCreateProduct>;
	uploadPicture: ReturnType<typeof useUploadPicture>;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
}) {
	const {
		name,
		category,
		buy_price,
		description,
		sale_units,
		sell_price_cash,
		sell_price_credit,
		supply_units,
		setField,
	} = useCreateProductStore(state => state);

	const onChange = useCallback<
		React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
	>(e => {
		const { name, value } = e.target;

		setField(name, value);
	}, []);

	const _onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
		e => {
			e.preventDefault();

			const productData = {
				name,
				description,
				category,
				buy_price: Number(buy_price),
				sell_price_cash: Number(sell_price_cash),
				sell_price_credit: Number(sell_price_credit),
				sale_units: Number(sale_units),
				supply_units: Number(supply_units),
			};

			if (typeof onSubmit === 'function') {
				onSubmit(e);
			}

			console.log(productData);
		},
		[onSubmit]
	);

	return (
		<form
			onSubmit={_onSubmit}
			className="bg-zinc-950 rounded px-6 py-4 text-zinc-50 space-y-4 max-w-lg">
			<InputGroup label="Nombre" name="name" onChange={onChange} />
			<TextArea
				className="resize-y"
				label="Descripcion"
				name="description"
				maxLength={300}
				onChange={onChange}
			/>
			<InputGroup label="Categoría" name="category" />
			<InputGroup
				label="Precio de compra"
				name="buy_price"
				type="number"
				onChange={onChange}
			/>
			<div className="flex gap-x-2 w-full justify-between">
				<div className="w-1/2 shrink">
					<InputGroup
						label="Precio (credito)"
						name="sell_price_credit"
						type="number"
						onChange={onChange}
					/>
				</div>
				<div className="w-1/2 shrink">
					<InputGroup
						label="Precio (contado)"
						name="sell_price_cash"
						type="number"
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
						onChange={onChange}
					/>
				</div>
				<div className="w-1/2 shrink">
					<InputGroup
						label="Unidades (insumo)"
						name="supply_units"
						type="number"
						onChange={onChange}
					/>
				</div>
			</div>
			<ImageInput
				label="Arrastra la imagen o haz click aquí"
				name="picture"
				className="w-1/2"
				onChange={e => {
					const { files } = e.target;
					if (!files) return;
					const file = files[0];
					setField('picture', file);
				}}
			/>
			<button
				type="submit"
				className="w-full py-2 bg-barber-red rounded-sm">
				Guardar Producto
			</button>
		</form>
	);
}

export default CreateForm;
