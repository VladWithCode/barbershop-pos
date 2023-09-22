import React from 'react';
import Action from './Action';

const QuickActions = [
	{
		name: 'Nueva Venta',
		icon: 'plus',
		href: '/ventas/nueva',
	},
	{
		name: 'Pago de Credito',
		icon: 'credit_card',
		href: '/creditos/pago',
	},
	{
		name: 'Entrada de Mercancia',
		icon: 'pencil',
		href: '/productos/entrada',
	},
];

function ActionsList() {
	return (
		<div className="px-2 w-full overflow-hidden">
			<p className="text-xl mb-2">Acciones Rapidas</p>

			<div className="flex w-full overflow-auto gap-x-4">
				{QuickActions.map((action, index) => (
					<Action action={{ ...action, id: index }} key={index} />
				))}
			</div>
		</div>
	);
}

export default ActionsList;
