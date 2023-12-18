import React, { useCallback, useState } from 'react';
import { getClassName, numberToPrice } from '@/app/_utils/helpers';
import Searchbar from '@/app/_components/Searchbar';
import Loading from '@/app/_components/Loading/Loading';
import { useCustomers } from '@/app/clientes/_hooks/useCustomers';
import { CustomerDoc } from '../_services/CustomerService';

export type SalePickerProps = {
	className?: string;
	context?: Record<string, any>;
};

export default function CustomerPicker({
	className,
	context,
}: SalePickerProps) {
	const [search, setSearch] = useState('');
	const { data, isLoading, isError, error } = useCustomers({
		search,
		active_credits: true,
	});

	const onSelection = useCallback(
		(selectedOption: CustomerDoc) => {
			if (typeof context?.onSelection === 'function') {
				context.onSelection(selectedOption);
			}
		},
		[context?.onSelection]
	);

	return (
		<div className={getClassName('flex gap-2', className)}>
			<div className="basis-1/2 px-12 py-6 my-auto shrink text-zinc-800">
				<h1 className="text-2xl">Elige al Cliente</h1>
				<div className="py-1" />
				<p className="font-light">
					Elige al cliente que esta realizando el pago.
				</p>
			</div>
			<div className="h-5/6 w-px bg-zinc-400 my-auto py-2" />
			<div className="flex flex-col flex-1">
				<div className="mx-auto w-11/12">
					<Searchbar onSearch={s => setSearch(s)} />
				</div>
				<div className="py-4" />
				<div className="flex flex-col gap-y-2 overflow-y-auto custom-scroll-bar flex-auto">
					{isLoading && (
						<div className="m-auto">
							<Loading />
						</div>
					)}
					{isError && (
						<p>
							{(error as any)?.message ||
								'Ocurrio un error al recuperar los clientes'}
						</p>
					)}
					{(data?.length as number) > 0 ? (
						data?.map(customer => (
							<button
								className="flex bg-zinc-800 px-2 py-1 rounded items-center"
								onClick={() => onSelection(customer)}
								key={customer._id}>
								<p className="text-lg w-1/6">
									{customer.active_credits || 0}
								</p>
								<p className="font-medium truncate w-2/6 text-start">
									{customer.fullname}
								</p>
								<div className="my-auto text-sm flex flex-col items-end ml-auto">
									{customer.pending_payments_amount > 0 ? (
										<>
											<p className="font-light">
												Cantidad Pendiente:
											</p>
											<span className="pl-4 font-medium">
												{numberToPrice(
													customer.pending_payments_amount /
														100
												)}
											</span>
										</>
									) : (
										<p className="my-auto">Pagado</p>
									)}
								</div>
							</button>
						))
					) : (
						<p className="m-auto text-xl text-zinc-800">
							No se encontraron clientes pendientes de pago
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
