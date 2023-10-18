'use client';
import Page from '@/app/_components/Page';
import { useParams } from 'next/navigation';
import React from 'react';
import { useSale } from '../../_hooks/useSale';
import { LabelledControlledInput } from '@/app/_components/Forms/ControlledInput';
import Loading from '@/app/_components/Loading/Loading';
import { UserSelect } from '../../_components/SaleSelect';
import Select from '@/app/_components/Forms/Select';
import useForm from '@/app/_hooks/useForm';

const PaymentMethods = [
	{ id: 'PM-01', label: 'Efectivo', value: 'cash' },
	{ id: 'PM-02', label: 'Tarjeta', value: 'card' },
	{ id: 'PM-03', label: 'Transferencia', value: 'transfer' },
];
const formatter = Intl.DateTimeFormat('es-mx', {
	year: 'numeric',
	day: 'numeric',
	month: 'long',
});

export default function Abono() {
	const { id } = useParams();
	const { data, isLoading, isError, error } = useSale(id as string);
	const [fields, onChange, setField] = useForm({
		amount: 0,
		date: '',
		received_by: '',
		payment_method: 'cash',
	});

	const handleSelectChange = (opt: any, id: string) => {
		setField(id, opt.value);
	};

	return (
		<Page>
			<div className="col-span-6 px-4 py-2">
				<h1 className="text-xl font-medium">
					Abonar a venta de {data?.customer_name || 'cargando...'}
				</h1>
				<div className="py-1" />
				<p className="text-zinc-500">
					Registrar en la base de datos un pago a la venta a credito
					de {data?.customer_name || 'cargando...'} realizada el día{' '}
					{data
						? formatter.format(new Date(data.deposit_date))
						: 'cargando...'}
				</p>
				<div className="py-2" />
				{isLoading && <Loading />}
				{isError && error ? (
					<p className="text-red-500">{error.message}</p>
				) : null}
				<form
					onSubmit={e => e.preventDefault()}
					className="bg-zinc-300 rounded px-4 py-2 text-zinc-950 space-y-2">
					<div className="flex gap-2">
						<LabelledControlledInput
							className="flex-auto"
							label="Cantidad de pago"
							name="amount"
							onChange={onChange}
							value={fields.amount}
						/>
						<div className="flex flex-col flex-auto justify-between">
							<p className="text-xs font-medium uppercase">
								Recibido por
							</p>
							<UserSelect onChange={() => {}} />
						</div>
					</div>
					<div className="flex gap-2">
						<LabelledControlledInput
							type="date"
							label="Fecha del pago"
							name="date"
							onChange={onChange}
							value={fields.date}
						/>
						<div className="flex flex-col flex-auto justify-between">
							<p className="text-xs font-medium uppercase">
								Metodo de pago
							</p>
							<Select
								id="payment_method"
								options={PaymentMethods}
								onSelect={handleSelectChange}
							/>
						</div>
					</div>

					<div className="py-2"></div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="bg-zinc-800 text-zinc-50 py-2 px-4 rounded">
							Guardar pago
						</button>
					</div>
				</form>
			</div>
		</Page>
	);
}
