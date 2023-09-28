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
		socialMedia: '',
		address: '',
	});

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await mutateAsync({
				...fields,
				social_media: fields.socialMedia,
			});
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
				'w-96 bg-zinc-300 text-zinc-950 py-2 px-4 rounded space-y-4',
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
			{/* 			<LabelledControlledInput
				label="Redes sociales"
				name="socialMedia"
				onChange={onChange}
				value={fields.socialMedia}
				type="text"
				placeholder="Facebook, Instagram, Twitter, etc."
			/> */}
			<div className="flex flex-col gap-y-2">
				<label
					htmlFor="socialMedia"
					className="text-xs font-medium uppercase">
					Redes sociales
				</label>
				<Select
					id="socialMedia"
					options={SocialMediaOptions}
					onSelect={opt => setField('socialMedia', opt.value)}
				/>
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

const SocialMediaOptions = [
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
