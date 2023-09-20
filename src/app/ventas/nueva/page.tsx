'use client';
import React, { useState } from 'react';
import { CustomerSelect, UserSelect } from '../_components/SaleSelect';
import AddModal from '../_components/AddModal';
import { AnimatePresence } from 'framer-motion';
import Select from '@/app/_components/Forms/Select';
import CurrencyInput from '@/app/_components/Forms/CurrencyInput';
import useCreateSaleStore from '../_stores/useCreateSaleStore';
import SaleProducts from '../_components/SaleProducts';
import { useCreateSale } from '../_services/sale.service';
import { useToast } from '@/app/_components/Toast/Toast';
import { useRouter } from 'next/navigation';

const PaymentMethods = [
	{ id: 'PM-01', label: 'Efectivo', value: 'cash' },
	{ id: 'PM-02', label: 'Tarjeta', value: 'card' },
	{ id: 'PM-03', label: 'Transferencia', value: 'transfer' },
];

const PaymentTypes = [
	{ id: 'PT-01', label: 'Contado', value: 'cash' },
	{ id: 'PT-02', label: 'Crédito', value: 'credit' },
];

function NuevaVenta() {
	const redirect = useRouter().push;
	const [isAddModalActive, setIsAddModalActive] = useState(false);
	const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);
	const {
		setField,
		setDeposit,
		setPaymentType,
		addProduct,
		removeProduct,
		clearState,
		...fields
	} = useCreateSaleStore(state => state);
	const { mutateAsync, isLoading } = useCreateSale();
	const { pushToast } = useToast();

	const handleSelectChange = (opt: any, id: string) => {
		setField(id, opt.value);
	};
	const handleInputChange = (value: string | number, id: string) => {
		setField(id, value);
	};

	const handleAddProduct = (product: any) => {
		addProduct(product);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await mutateAsync(fields, {
			onSuccess: () => {
				pushToast({
					message: 'Venta realizada con éxito',
					type: 'success',
				});

				clearState();
				setIsConfirmModalActive(true);
			},
		});
	};

	return (
		<div className="relative w-full h-page z-0">
			<h1 className="text-lg px-8 pt-2 pb-8">Registrar venta nueva</h1>
			<div className="flex">
				<form
					onSubmit={handleSubmit}
					className="w-2/5 mx-auto py-2 px-4 bg-zinc-300 text-zinc-950 rounded space-y-4 overflow-hidden">
					<div className="relative flex flex-col z-20">
						<p className="font-medium">Cliente</p>
						<CustomerSelect
							value={fields.customer}
							onChange={opt => setField('customer', opt.value)}
						/>
						{/* 						<CustomerSelect
							onChange={opt => setField('customer', opt.value)}
						/> */}
					</div>
					<div className="flex flex-col">
						<p className="font-medium">Vendedor</p>
						<UserSelect
							onChange={opt => setField('seller', opt.value)}
						/>
					</div>
					<div className="flex gap-x-3">
						<div className="basis-1/2 grow-0">
							<p className="font-medium">Método de pago</p>
							<Select
								id="payment_method"
								options={PaymentMethods}
								onSelect={handleSelectChange}
							/>
						</div>
						<div className="basis-1/2 grow-0">
							<p className="font-medium">Tipo de pago</p>
							<Select
								id="payment_type"
								options={PaymentTypes}
								onSelect={opt => setPaymentType(opt.value)}
								defaultValue="PT-01"
							/>
						</div>
					</div>

					{/* Display inputs based on payment_type */}
					{fields.payment_type === 'credit' ? (
						<CreditSaleFields
							commission={fields.commission}
							deposit={fields.deposit}
							installment={fields.installment}
							next_payment_date={fields.next_payment_date}
							setField={setField}
							setDeposit={setDeposit}
							handleInputChange={handleInputChange}
						/>
					) : (
						<CashSaleFields
							commission={fields.commission}
							deposit={fields.deposit}
							handleInputChange={handleInputChange}
							setDeposit={setDeposit}
						/>
					)}

					<div className="flex">
						<button
							className="bg-zinc-800 text-zinc-50 px-4 py-2 rounded-sm ml-auto hover:bg-zinc-700"
							type="submit"
							disabled={isLoading}>
							Realizar Venta
						</button>
					</div>
				</form>
				<SaleProducts
					handleAddClick={() => setIsAddModalActive(true)}
					handleRemoveClick={removeProduct}
					products={fields.products}
					total={fields.total}
					priceKey={
						fields.payment_type === 'cash'
							? 'sell_price_cash'
							: 'sell_price_credit'
					}
				/>
			</div>

			<AnimatePresence>
				{isAddModalActive ? (
					<AddModal
						isActive={isAddModalActive}
						setIsActive={setIsAddModalActive}
						onAdd={handleAddProduct}
					/>
				) : null}
			</AnimatePresence>
			{isConfirmModalActive && (
				<ConfirmModal
					message="La venta se registro con exito. ¿Deseas revisarla ahora?"
					isActive={true}
					onConfirm={() => {
						setIsConfirmModalActive(false);
						redirect('/ventas');
					}}
					onCancel={() => setIsConfirmModalActive(false)}
				/>
			)}
		</div>
	);
}

export default NuevaVenta;

function CashSaleFields({
	deposit,
	commission,
	setDeposit,
	handleInputChange,
}: {
	deposit: number;
	commission: number;
	setDeposit: (value: number) => void;
	handleInputChange: (value: string | number, id: string) => void;
}) {
	return (
		<div className="flex gap-x-3">
			<div className="w-1/2 grow-0">
				<p className="text-sm font-medium">Cantidad anticipo</p>
				<CurrencyInput
					className="text-right mt-2 w-full"
					name="deposito"
					type="number"
					value={deposit}
					onChange={value => setDeposit(+value)}
				/>
			</div>
			<div className="w-1/2 grow-0">
				<p className="text-sm font-medium">Comision</p>
				<CurrencyInput
					className="text-right mt-2 w-full"
					name="commission"
					type="number"
					value={commission}
					onChange={handleInputChange}
				/>
			</div>
		</div>
	);
}

function CreditSaleFields({
	deposit,
	installment,
	commission,
	next_payment_date,
	setField,
	setDeposit,
	handleInputChange,
}: {
	deposit: number;
	installment: number;
	commission: number;
	next_payment_date: string;
	setField: (field: string, value: any) => void;
	setDeposit: (value: number) => void;
	handleInputChange: (value: string | number, id: string) => void;
}) {
	return (
		<div className="flex gap-x-3">
			<div className="w-1/4 grow-0">
				<p className="text-sm font-medium">Cantidad anticipo</p>
				<CurrencyInput
					className="text-right mt-2 w-full"
					name="deposit"
					type="number"
					value={deposit}
					onChange={value => setDeposit(+value)}
				/>
			</div>
			<div className="w-1/4 grow-0">
				<p className="text-sm font-medium">Cantidad p/quincena</p>
				<CurrencyInput
					className="text-right mt-2 w-full"
					name="installment"
					type="number"
					value={installment}
					onChange={handleInputChange}
				/>
			</div>
			<div className="w-1/4 grow-0">
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
			<div className="w-1/4 shrink grow-0">
				<p className="text-sm font-medium">Comisión</p>
				<CurrencyInput
					className="text-right mt-2 w-full"
					name="commission"
					type="number"
					value={commission}
					onChange={handleInputChange}
				/>
			</div>
		</div>
	);
}

function ConfirmModal({
	message,
	isActive,
	onConfirm,
	onCancel,
}: {
	message: string;
	isActive: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}) {
	return (
		<div
			className={
				'fixed inset-0 z-50 bg-zinc-900 bg-opacity-50 flex justify-center items-center text-zinc-950 ' +
				(isActive ? 'visible' : 'invisible')
			}>
			<div className="bg-zinc-50 rounded p-4">
				<p className="text-center w-3/5 mx-auto">{message}</p>
				<div className="flex justify-center gap-x-2 mt-4">
					<button
						className="bg-zinc-800 text-zinc-50 px-4 py-2 rounded-sm hover:bg-zinc-700"
						onClick={onConfirm}>
						Sí
					</button>
					<button
						className="bg-zinc-800 text-zinc-50 px-4 py-2 rounded-sm hover:bg-zinc-700"
						onClick={onCancel}>
						No
					</button>
				</div>
			</div>
		</div>
	);
}
