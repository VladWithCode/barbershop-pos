import React from 'react';
import { useDeleteCustomer } from '../_hooks/useCustomers';
import { getClassName } from '@/app/_utils/helpers';
import Spinner from '@/app/_components/Loading/Spinner';

export default function DeleteCustomer({
	customerId,
	onCancel,
}: {
	customerId: string;
	onCancel: () => void;
}) {
	const { data, isLoading, isError, error } = useDeleteCustomer(customerId);

	return (
		<div className="bg-zinc-300 text-zinc-950 py-2 px-4 rounded space-y-4">
			<h2 className="text-lg font-medium">
				¿Estás seguro de que quieres eliminar al cliente?
			</h2>
			<p className="text-sm">
				Si eliminas al cliente ya no aparecera en los listados pero aún
				podrás ver su historial crediticio y sus ventas
			</p>
			<div className="flex justify-between">
				<button
					className={getClassName(
						'bg-rose-900 text-zinc-50 px-4 py-2 rounded',
						isLoading && 'brightness-90 pointer-events-none'
					)}
					onClick={onCancel}>
					Cancelar
				</button>
				<button
					className={getClassName(
						'bg-zinc-800 text-zinc-50 px-4 py-2 rounded',
						isLoading && 'brightness-90 pointer-events-none'
					)}
					onClick={() => {}}>
					{isLoading ? (
						<div className="aspect-square m-auto">
							<Spinner />
						</div>
					) : (
						'Confirmar'
					)}
				</button>
			</div>
		</div>
	);
}
