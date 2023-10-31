import React, { useState } from 'react';
import useCreateSaleStore from '../_stores/useCreateSaleStore';
import Select from '@/app/_components/Forms/Select';
import { CustomerDoc } from '@/app/clientes/_services/CustomerService';
import { CustomerSelect, UserSelect } from './SaleSelect';
import { useFloatingWindowStore } from '@/app/_FloatingWindows/stores/useFloatingWindowStore';
import { TSelectOption } from '@/app/_components/Forms/SearchableSelect';
import CurrencyInput from '@/app/_components/Forms/CurrencyInput';

const PaymentMethods = [
	{ id: 'PM-01', label: 'Efectivo', value: 'cash' },
	{ id: 'PM-02', label: 'Tarjeta', value: 'card' },
	{ id: 'PM-03', label: 'Transferencia', value: 'transfer' },
];

const PaymentTypes = [
	{ id: 'PT-01', label: 'Contado', value: 'cash' },
	{ id: 'PT-02', label: 'Crédito', value: 'credit' },
];

export type CreateSaleProps = {
	handleSubmit: (e: React.FormEvent) => void;
	isLoading: boolean;
};

export default function CreateSale({
	handleSubmit,
	isLoading,
}: CreateSaleProps) {
	const [preselectedCustomer, setPreselectedCustomer] = useState<
		TSelectOption | undefined
	>();
	const {
		customer,
		paymentType,
		setField,
		setPaymentType,
		deposit,
		installment,
		nextPaymentDate,
		setDeposit,
	} = useCreateSaleStore(state => ({
		setField: state.setField,
		setPaymentType: state.setPaymentType,
		setDeposit: state.setDeposit,
		customer: state.customer,
		paymentType: state.payment_type,
		nextPaymentDate: state.next_payment_date,
		installment: state.installment,
		deposit: state.deposit,
	}));
	const displayNamedWindow = useFloatingWindowStore(
		state => state.displayNamedWindow
	);
	const hideWindow = useFloatingWindowStore(state => state.hideWindow);

	const handleSelectChange = (opt: any, id: string) => {
		setField(id, opt.value);
	};
	const handleInputChange = (value: string | number, id: string) => {
		setField(id, value);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full mx-auto py-2 px-4 bg-zinc-300 text-zinc-950 rounded space-y-3 overflow-hidden">
			<div className="relative flex flex-col z-20">
				<p className="font-medium">
					Cliente <span className="text-xs">(*)</span>
				</p>
				<div className="flex items-center">
					<CustomerSelect
						value={customer}
						onChange={opt => setField('customer', opt.value)}
						preselectedOption={preselectedCustomer}
					/>
					<button
						type="button"
						className="text-zinc-950 hover:text-zinc-700"
						onClick={() =>
							displayNamedWindow('NEW_CUSTOMER', {
								onSuccess: (customer: CustomerDoc) => {
									setField('customer', customer._id);
									setPreselectedCustomer({
										id: customer._id,
										label: customer.fullname,
										value: customer._id,
									});
									hideWindow();
								},
							})
						}>
						<svg className="w-8 h-8 m-auto fill-current">
							<use href="/sprites.svg#plus"></use>
						</svg>
					</button>
				</div>
			</div>
			<div className="flex flex-col">
				<p className="font-medium">
					Vendedor<span className="text-xs">(*)</span>
				</p>
				<UserSelect onChange={opt => setField('seller', opt.value)} />
			</div>
			<div className="flex gap-x-3">
				<div className="basis-1/2 grow-0">
					<p className="font-medium">
						Método de pago
						<span className="text-xs">(*)</span>
					</p>
					<Select
						id="payment_method"
						options={PaymentMethods}
						onSelect={handleSelectChange}
					/>
				</div>
				<div className="basis-1/2 grow-0">
					<p className="font-medium">
						Tipo de pago
						<span className="text-xs">(*)</span>
					</p>
					<Select
						id="payment_type"
						options={PaymentTypes}
						onSelect={opt => setPaymentType(opt.value)}
						defaultValue="PT-01"
					/>
				</div>
			</div>
			{/* Display inputs based on payment_type */}
			{paymentType === 'credit' ? (
				<CreditSaleFields
					deposit={deposit}
					installment={installment}
					next_payment_date={nextPaymentDate}
					setField={setField}
					setDeposit={setDeposit}
					handleInputChange={handleInputChange}
				/>
			) : (
				<CashSaleFields
					deposit={deposit}
					handleInputChange={handleInputChange}
					setDeposit={setDeposit}
				/>
			)}

			<div className="flex pt-3">
				<button
					className="bg-zinc-800 text-zinc-50 px-4 py-2 rounded-sm ml-auto hover:bg-zinc-700"
					type="submit"
					disabled={isLoading}>
					Realizar Venta
				</button>
			</div>
			<p className="text-xs text-zinc-500">(*) Campo Requerido</p>
		</form>
	);
}

function CashSaleFields({
	deposit,
	setDeposit,
	handleInputChange,
}: {
	deposit: number;
	setDeposit: (value: number) => void;
	handleInputChange: (value: string | number, id: string) => void;
}) {
	return (
		<div className="flex gap-x-3">
			<div className="w-1/2 grow-0">
				<p className="text-sm font-medium">
					Cantidad anticipo
					<span className="text-xs">(*)</span>
				</p>
				<CurrencyInput
					className="text-right mt-2 w-full"
					name="deposito"
					type="number"
					value={deposit}
					onChange={value => setDeposit(+value)}
				/>
			</div>
			{/* 			<div className="w-1/2 grow-0">
				<p className="text-sm font-medium">Comision</p>
				<CurrencyInput
					className="text-right mt-2 w-full"
					name="commission"
					type="number"
					value={commission}
					onChange={handleInputChange}
				/>
			</div> */}
		</div>
	);
}

function CreditSaleFields({
	deposit,
	installment,
	next_payment_date,
	setField,
	setDeposit,
	handleInputChange,
}: {
	deposit: number;
	installment: number;
	next_payment_date: string;
	setField: (field: string, value: any) => void;
	setDeposit: (value: number) => void;
	handleInputChange: (value: string | number, id: string) => void;
}) {
	return (
		<div className="flex gap-x-2 items-end">
			<div className="flex-auto grow-0">
				<p className="text-sm font-medium">
					Cantidad anticipo
					<span className="text-xs">(*)</span>
				</p>
				<CurrencyInput
					className="text-right mt-2 w-full"
					name="deposit"
					type="number"
					value={deposit}
					onChange={value => setDeposit(+value)}
				/>
			</div>
			<div className="flex-auto grow-0">
				<p className="text-sm font-medium">
					Cantidad p/quincena
					<span className="text-xs">(*)</span>
				</p>
				<CurrencyInput
					className="text-right mt-2 w-full"
					name="installment"
					type="number"
					value={installment}
					onChange={handleInputChange}
				/>
			</div>
			<div className="flex-auto grow-0">
				<p className="text-sm font-medium">Fecha siguiente pago</p>
				<input
					className="bg-transparent border-2 border-transparent border-b-zinc-950 focus:ring-0 focus:border-zinc-50 focus:bg-zinc-800 focus:text-zinc-50 focus:rounded"
					type="date"
					name="next_payment_date"
					id="next_payment_date"
					value={next_payment_date}
					onChange={e =>
						setField('next_payment_date', e.target.value)
					}
				/>
			</div>
			{/* 			<div className="flex-auto shrink grow-0">
				<p className="text-sm font-medium">
					Comisión
					<span className="text-xs">(*)</span>
				</p>
				<CurrencyInput
					className="text-right mt-2 w-full"
					name="commission"
					type="number"
					value={commission}
					onChange={handleInputChange}
				/>
			</div> */}
		</div>
	);
}
