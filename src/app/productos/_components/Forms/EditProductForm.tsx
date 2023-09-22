import useForm from '@/app/_hooks/useForm';
import React from 'react';
import { Product } from '../../_services/product.service';

export type EditProductFormProps<PT> = {
	product: PT;
	handleEdit: any;

	disableFields?: string[];
};

export default function EditProductForm<
	PT extends Record<string, any> = Product
>({ product, handleEdit, ...props }: EditProductFormProps<PT>) {
	const [fields, setField, reset] = useForm(product);

	return (
		<form
			onSubmit={e => e.preventDefault()}
			className="bg-zinc-200 text-zinc-950 w-full max-w-lg p-2 rounded"></form>
	);
}
