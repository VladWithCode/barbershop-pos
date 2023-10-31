import CurrencyInput from '@/app/_components/Forms/CurrencyInput';
import { getClassName, numberToPrice } from '@/app/_utils/helpers';
import React from 'react';
import PaymentMethodSelect from './PaymentMethodSelect';
import useForm from '@/app/_hooks/useForm';
import { PaymentMethods } from '../_stores/useCreateSaleStore';
import { LabelledControlledInput } from '@/app/_components/Forms/ControlledInput';
import { useCustomerPaymentInfo } from '@/app/clientes/_hooks/useCustomers';
import Loading from '@/app/_components/Loading/Loading';
import { NewPaymentCredit } from '../_stores/useNewPaymentStore';

export type CreatePaymentProps = {
	expectedPaymentAmount?: number;
};

export default function CreatePayment({
	expectedPaymentAmount,
}: CreatePaymentProps) {
	const expectedAmount =
		typeof expectedPaymentAmount === 'number'
			? expectedPaymentAmount / 100
			: 0;
	const [fields, handleInputChange, setField, reset] = useForm({
		paymentAmount: expectedAmount,
		paymentMethod: PaymentMethods.CASH,
		paymentDate: new Date().toISOString().split('T')[0],
	});

	const handleSelectChange = (opt: any, id: string) => {
		setField(id, opt.value);
	};

	return (
		<form className="bg-zinc-200 px-4 py-2 text-zinc-800 space-y-3 rounded">
			<div className="flex gap-2 w-full">
				<div className="basis-1/2">
					<LabelledControlledInput
						label="Cantidad Abonada"
						name="paymentAmount"
						onChange={handleInputChange}
						value={fields.paymentAmount}
					/>
				</div>
				<PaymentMethodSelect
					className="basis-1/2"
					handleSelectChange={handleSelectChange}
				/>
			</div>
			<div className="flex gap-2 w-full">
				<div className="basis-1/2">
					<LabelledControlledInput
						type="date"
						label="Fecha de Pago"
						name="paymentDate"
						onChange={handleInputChange}
						value={fields.paymentDate}
					/>
				</div>
			</div>
		</form>
	);
}

export type CreatePaymentWindowProps = {
	context: Record<string, any> & {
		creditData: NewPaymentCredit;
	};
	className?: string;
};

export function CreatePaymentWindow({
	className,
	context,
}: CreatePaymentWindowProps) {
	const { data, isLoading, isError, error } = useCustomerPaymentInfo(
		context.creditData._id
	);

	return (
		<div className={getClassName('flex gap-2', className)}>
			{isError && (
				<div className="m-auto">
					<p className="text-xl text-zinc-400">
						Ocurrio un error al recuperar la información del
						servidor.
					</p>
					<p className="text-zinc-400">{error.message}</p>
				</div>
			)}
			{isLoading && (
				<div className="m-auto">
					<Loading />
				</div>
			)}
			{data !== undefined && (
				<>
					<div className="flex flex-col basis-1/2 px-12 py-2 shrink text-zinc-800">
						<h1 className="text-2xl shrink">
							Información del pago
						</h1>
						<p className="font-light shrink">
							Ingresa la información del pago recibido
						</p>
						<div className="py-2" />
						<h3 className="text-lg shrink">
							Información del cliente
						</h3>
						<div className="py-1" />
						<div className="flex gap-2 shrink">
							<div className="flex flex-col basis-1/3">
								<p className="text-xs uppercase font-light">
									Nombre
								</p>
								<p className="font-medium truncate">
									{data.customerData.fullname}
								</p>
							</div>
							<div className="flex flex-col basis-1/3 text-center">
								<p className="text-xs uppercase font-light">
									Telefono
								</p>
								<p className="font-medium truncate">
									{data.customerData.phone}
								</p>
							</div>
							<div className="flex flex-col basis-1/3 text-end">
								<p className="text-xs uppercase font-light">
									Compras activas
								</p>
								<p className="font-medium">
									{data.customerData.active_credits}
								</p>
							</div>
						</div>
						<div className="py-0.5" />
						<h3 className="text-lg shrink">
							Información de compras
						</h3>
						<div className="py-1" />
						<div className="flex flex-auto gap-2">
							<div className="p-2 bg-zinc-200 rounded w-4/6 space-y-3 overflow-hidden overflow-y-auto custom-scroll-bar text-zinc-50">
								{data.customerData.sales_data.map(sale => (
									<div className="flex gap-2 p-1 bg-zinc-800 rounded">
										<div className="basis-1/4 shrink flex flex-col text-center">
											<p className="text-xs">Articulos</p>
											<p className="font-medium">
												{sale.item_count}
											</p>
										</div>
										<div className="basis-1/4 shrink flex flex-col text-center">
											<p className="text-xs">Pendiente</p>
											<p className="font-medium">
												{numberToPrice(
													sale.pending_amount / 100
												)}
											</p>
										</div>
										<div className="basis-1/4 shrink flex flex-col text-center">
											<p className="text-xs">Quincena</p>
											<p className="font-medium">
												{numberToPrice(
													sale.installment / 100
												)}
											</p>
										</div>
										<div className="basis-1/4 shrink flex flex-col text-center">
											<p className="text-xs">Estatus</p>
											<p className="font-medium">
												{sale.status === 'over_due'
													? 'Retrasado'
													: sale.status ===
													  'pending_payment'
													? 'Pendiente'
													: 'Pagado'}
											</p>
										</div>
									</div>
								))}
							</div>
							<div className="space-y-2 w-2/6 text-end py-2">
								<div className="flex flex-col">
									<p className="text-xs uppercase">
										Total pendiente
									</p>
									<p className="text-lg font-medium">
										{numberToPrice(
											data.paymentData
												.totalPendingPayment / 100
										)}
									</p>
								</div>
								<div className="flex flex-col">
									<p className="text-xs uppercase">
										Cantidad de abono esperada
									</p>
									<p className="text-lg font-medium">
										{numberToPrice(
											data.paymentData
												.expectedPaymentAmount / 100
										)}
									</p>
								</div>
								<div className="flex flex-col">
									<p className="text-xs uppercase">
										Pago retrasado
									</p>
									<p className="text-lg font-medium">
										{data.paymentData.hasOverduePayments
											? 'Si'
											: 'No'}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="h-5/6 w-px bg-zinc-400 my-auto py-2" />
					<div className="basis-1/2 px-12">
						<CreatePayment
							expectedPaymentAmount={
								data?.paymentData.expectedPaymentAmount
							}
						/>
					</div>
				</>
			)}
		</div>
	);
}
