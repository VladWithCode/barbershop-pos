import React from 'react';
import Option from './Option';

const MenuOptions = [
	{
		name: 'Ventas',
		icon: 'bill',
		href: '/ventas',
	},
	{
		name: 'Productos',
		icon: 'cologne',
		href: '/productos',
	},
	{
		name: 'Clientes',
		icon: 'pencil',
		href: '/clientes',
	},
	{
		name: 'Creditos',
		icon: 'plus',
		href: '/creditos',
	},
	{
		name: 'Reportes',
		icon: 'credit_card',
		href: '/reportes',
	},
	{
		name: 'Gastos',
		icon: 'pencil',
		href: '/gastos',
	},
];

function Menu() {
	return (
		<div className="px-2 py-4 w-full overflow-hidden">
			<h2 className="text-xl mb-2">Menú</h2>

			<div className="grid grid-cols-3 gap-2">
				{MenuOptions.map((option, index) => (
					<Option option={{ ...option, id: index }} />
				))}
			</div>
		</div>
	);
}

export default Menu;
