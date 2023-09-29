'use client';

import React, { useState } from 'react';
import { useCustomerById } from '../_hooks/useCustomers';
import { useParams } from 'next/navigation';
import CustomerDetail from '../_components/CustomerDetail';
import Loading from '@/app/_components/Loading/Loading';
import EditCustomerForm from '../_components/EditCustomerForm';
import { AnimatePresence, motion } from 'framer-motion';
import DeleteCustomer from '../_components/DeleteCustomer';

export default function Cliente() {
	const { id } = useParams();
	const {
		data: customer,
		isLoading,
		isError,
		error,
	} = useCustomerById(id as string);
	const [activeComponent, setActiveComponent] = useState<
		'Detail' | 'Update' | 'Delete'
	>('Detail');

	return (
		<div className="h-page py-2 max-w-screen-xl grid grid-cols-12 auto-rows-fr mx-auto gap-x-2 overflow-hidden">
			<div className="col-span-6 px-2 py-4">
				<h1 className="text-xl font-medium">Perfil de Cliente</h1>
				<p className="text-zinc-500">Datos y detalles del cliente</p>
				<div className="py-2" />

				{isLoading && <Loading />}
				{isError && error ? (
					<p className="text-red-500">{error.message}</p>
				) : null}
				{customer && (
					<>
						{activeComponent === 'Detail' && (
							<AnimatePresence mode="popLayout">
								<motion.div
									className="relative max-w-md mx-auto"
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: 20, opacity: 0 }}>
									<CustomerDetail customer={customer} />
								</motion.div>
							</AnimatePresence>
						)}
						{activeComponent === 'Update' && (
							<AnimatePresence mode="popLayout">
								<motion.div
									className="relative max-w-md mx-auto"
									initial={{ y: -20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: -20, opacity: 0 }}>
									<EditCustomerForm
										customer={customer}
										onCancel={() =>
											setActiveComponent('Detail')
										}
									/>
								</motion.div>
							</AnimatePresence>
						)}
						{activeComponent === 'Delete' && (
							<AnimatePresence mode="popLayout">
								<motion.div
									className="relative max-w-md mx-auto"
									initial={{ y: -20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: -20, opacity: 0 }}>
									<DeleteCustomer
										customerId={customer._id}
										onCancel={() =>
											setActiveComponent('Detail')
										}
									/>
								</motion.div>
							</AnimatePresence>
						)}
					</>
				)}
			</div>

			<div className="col-span-6 px-2 py-4">
				<h2 className="text-lg text-right">Acciones</h2>
				<div className="py-2"></div>
				<div className="flex flex-wrap gap-2 w-fit ml-auto text-zinc-50">
					<button
						onClick={() => setActiveComponent('Update')}
						className="flex flex-col bg-rose-950 w-32 aspect-square rounded py-1 px-2 items-center justify-center gap-y-2 group hover:bg-rose-900">
						<svg className="w-8 h-12 fill-current">
							<use href="/sprites.svg#pencil"></use>
						</svg>
						<p className="text-sm font-medium">Editar Cliente</p>
					</button>

					<button
						onClick={() => setActiveComponent('Delete')}
						className="flex flex-col bg-rose-950 w-32 aspect-square rounded py-1 px-2 items-center justify-center gap-y-2 group hover:bg-rose-900">
						<svg className="w-8 h-8 fill-current">
							<use href="/sprites.svg#bin"></use>
						</svg>
						<p className="text-sm font-medium text-center">
							Eliminar Cliente
						</p>
					</button>
				</div>
			</div>
		</div>
	);
}
