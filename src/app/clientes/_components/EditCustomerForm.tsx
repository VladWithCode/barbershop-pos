import React, { ChangeEvent } from 'react';
import { CustomerDoc } from '../_services/CustomerService';
import { LabelledControlledInput } from '@/app/_components/Forms/ControlledInput';
import Select from '@/app/_components/Forms/Select';
import { useToast } from '@/app/_components/Toast/Toast';
import useForm from '@/app/_hooks/useForm';
import { getClassName } from '@/app/_utils/helpers';
import { useUpdateCustomer } from '../_hooks/useCustomers';
import { SocialMediaOptions } from './CreateCustomerForm';
import Spinner from '@/app/_components/Loading/Spinner';

export default function EditCustomerForm({
	customer,
	onCancel,
	className,
}: {
	customer: CustomerDoc;
	onCancel: () => void;
	className?: string;
}) {
	const { pushToast } = useToast();
	const { mutateAsync, isLoading, isError } = useUpdateCustomer(customer._id);
	const [fields, onChange, setField] = useForm<CustomerDoc>({
		...customer,
		dob: new Date(customer.dob).toISOString(),
	});

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await mutateAsync(fields);
			pushToast({ message: 'Cliente actualizado', type: 'success' });
			onCancel();
		} catch (error) {
			console.error(error);
			pushToast({
				message: 'Error al actualizar cliente',
				type: 'error',
			});
		}
	};

	return (
		<form
			onSubmit={onSubmit}
			className={getClassName(
				'max-w-md bg-zinc-300 text-zinc-950 py-2 px-4 rounded space-y-4',
				className
			)}>
			<div className="flex gap-x-1 max-w-full">
				<div className="w-1/2">
					<LabelledControlledInput
						label="Nombre Completo"
						name="fullname"
						onChange={onChange}
						value={fields.fullname}
					/>
				</div>
				<div className="w-1/2">
					<LabelledControlledInput
						label="Teléfono"
						name="phone"
						onChange={onChange}
						value={fields.phone}
						type="tel"
					/>
				</div>
			</div>
			<LabelledControlledInput
				label="Fecha de nacimiento"
				name="dob"
				onChange={e => {
					const d = new Date(
						(e as ChangeEvent<HTMLInputElement>).target.value
					);
					onChange;
				}}
				value={fields.dob.split('T')[0]}
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
						defaultValue={fields.social_media}
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
				value={fields.address || ''}
				type="text"
			/>

			<div className="flex justify-between">
				<button
					onClick={onCancel}
					className="bg-rose-900 text-zinc-50 px-4 py-2 rounded"
					type="button">
					Cancelar
				</button>
				<button
					className={getClassName(
						'bg-zinc-800 text-zinc-50 px-4 py-2 rounded',
						isLoading && 'brightness-90 pointer-events-none'
					)}
					type="submit">
					{isLoading ? (
						<div className="aspect-square m-auto">
							<Spinner width={6} borderWidth={2} />
						</div>
					) : (
						'Guardar'
					)}
				</button>
			</div>
		</form>
	);
}
