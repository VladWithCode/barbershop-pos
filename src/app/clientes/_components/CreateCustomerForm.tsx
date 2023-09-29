'use client';

import { LabelledControlledInput } from '@/app/_components/Forms/ControlledInput';
import Select from '@/app/_components/Forms/Select';
import useForm from '@/app/_hooks/useForm';
import { getClassName } from '@/app/_utils/helpers';
import React from 'react';
import { useMutateCustomer } from '../_hooks/useCustomers';
import { useToast } from '@/app/_components/Toast/Toast';

export type CreateCustomerFormProps = {
	className?: string;
};

export default function CreateCustomerForm({
	className,
}: CreateCustomerFormProps) {
	const { pushToast } = useToast();
	const { mutateAsync, isLoading, isError } = useMutateCustomer();
	const [fields, onChange, setField, reset] = useForm({
		fullname: '',
		phone: '',
		dob: '',
		social_media: '',
		social_media_name: '',
		address: '',
	});

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await mutateAsync(fields);
			pushToast({ message: 'Cliente agregado', type: 'success' });
			reset();
		} catch (error) {
			console.error(error);
			pushToast({ message: 'Error al agregar cliente', type: 'error' });
		}
	};

	return (
		<form
			onSubmit={onSubmit}
			className={getClassName(
				'max-w-md bg-zinc-300 text-zinc-950 py-2 px-4 rounded space-y-4',
				className
			)}>
			<LabelledControlledInput
				label="Nombre Completo"
				name="fullname"
				onChange={onChange}
				value={fields.fullname}
			/>
			<LabelledControlledInput
				label="Teléfono"
				name="phone"
				onChange={onChange}
				value={fields.phone}
				type="tel"
			/>
			<LabelledControlledInput
				label="Fecha de nacimiento"
				name="dob"
				onChange={onChange}
				value={fields.dob}
				type="date"
			/>
			<div className="flex justify-between">
				<div className="flex flex-col gap-y-2 basis-1/3 grow-0 shrink">
					<label
						htmlFor="social_media"
						className="text-xs font-medium uppercase">
						Redes sociales
					</label>
					<Select
						id="social_media"
						options={SocialMediaOptions}
						onSelect={opt => setField('social_media', opt.value)}
					/>
				</div>
				<div className="space-y-1">
					<LabelledControlledInput
						label="Nombre (en Red Social)"
						name="social_media_name"
						onChange={onChange}
						value={fields.social_media_name}
					/>
				</div>
			</div>
			<LabelledControlledInput
				label="Domicilio"
				name="address"
				onChange={onChange}
				value={fields.address}
				type="text"
			/>

			<div className="flex justify-end">
				<button
					className="bg-zinc-800 text-zinc-50 px-4 py-2 rounded"
					type="submit">
					Agregar
				</button>
			</div>
		</form>
	);
}

export const SocialMediaOptions = [
	{
		id: 'facebook',
		value: 'facebook',
		label: 'Facebook',
	},
	{
		id: 'instagram',
		value: 'instagram',
		label: 'Instagram',
	},
	{
		id: 'twitter',
		value: 'twitter',
		label: 'Twitter',
	},
	{
		id: 'tiktok',
		value: 'tiktok',
		label: 'TikTok',
	},
];
