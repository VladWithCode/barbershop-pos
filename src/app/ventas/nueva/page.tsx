'use client';
import React from 'react';
import { CustomerSelect, UserSelect } from '../_components/SaleSelect';
import AddModal from '../_components/AddModal';
import { AnimatePresence } from 'framer-motion';
import Select from '@/app/_components/Forms/Select';
import CurrencyInput from '@/app/_components/Forms/CurrencyInput';
import useCreateSaleStore from '../_stores/useCreateSaleStore';
import SaleProducts from '../_components/SaleProducts';
import { useCreateSale } from '../_services/sale.service';

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
	const [isAddModalActive, setIsAddModalActive] = React.useState(false);
	const {
		setField,
		setDeposit,
		setPaymentType,
		addProduct,
		removeProduct,
		...fields
	} = useCreateSaleStore(state => state);
	const {} = useCreateSale();

	const handleSelectChange = (opt: any, id: string) => {
		setField(id, opt.value);
	};
	const handleInputChange = (value: string | number, id: string) => {
		setField(id, value);
	};

	const handleAddProduct = (product: any) => {
		addProduct(product);
	};

	return (
		<div className="relative w-full h-page z-0">
			<h1 className="text-lg px-8 pt-2 pb-8">Registrar venta nueva</h1>
			<div className="flex">
				<form
					onSubmit={e => {
						e.preventDefault();

						console.log(fields);
					}}
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
							type="submit">
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
				<input
					className="w-full bg-transparent border-2 border-transparent border-b-zinc-950 focus:ring-0 focus:border-zinc-50 focus:bg-zinc-800 focus:text-zinc-50 focus:rounded"
					type="number"
					name="commission"
					id="commission"
					value={commission}
					onChange={e => setField('commission', e.target.value)}
				/>
			</div>
		</div>
	);
}
