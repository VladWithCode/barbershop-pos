import React from 'react';
import CreateCustomerForm from '../_components/CreateCustomerForm';

export default function CrearCliente() {
	return (
		<div className="h-page py-2">
			<div className="h-full max-w-screen-xl grid grid-cols-12 auto-rows-fr justify-between gap-2 mx-auto overflow-hidden">
				{/* Create form */}
				<div className="col-span-6 px-2 py-4">
					<h1 className="text-xl font-medium">Crear cliente</h1>
					<p className="text-zinc-500">
						Agregar un nuevo cliente a la base de datos
					</p>
					<div className="py-2" />

					<CreateCustomerForm className="mx-auto" />
				</div>
			</div>
		</div>
	);
}
