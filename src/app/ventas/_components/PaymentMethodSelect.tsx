import Select from '@/app/_components/Forms/Select';
import { getClassName } from '@/app/_utils/helpers';
import React from 'react';

const PaymentMethods = [
	{ id: 'PM-01', label: 'Efectivo', value: 'cash' },
	{ id: 'PM-02', label: 'Tarjeta', value: 'card' },
	{ id: 'PM-03', label: 'Transferencia', value: 'transfer' },
];

export type PaymentMethodSelectProps = {
	handleSelectChange: (opt: any, id: string) => void;
	className?: string;
};

export default function PaymentMethodSelect({
	handleSelectChange,
	className,
}: PaymentMethodSelectProps) {
	return (
		<div className={getClassName('flex flex-col gap-1', className)}>
			<p className="text-xs font-medium uppercase">
				Método de pago
				<span className="text-xs">(*)</span>
			</p>
			<Select
				id="payment_method"
				options={PaymentMethods}
				onSelect={handleSelectChange}
			/>
		</div>
	);
}
