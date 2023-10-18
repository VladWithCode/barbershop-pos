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
		icon: 'customers',
		href: '/clientes',
	},
	/* 	{
		name: 'Creditos',
		icon: 'credit_card',
		href: '/creditos',
	},
	{
		name: 'Reportes',
		icon: 'clipboard',
		href: '/reportes',
	},
	{
		name: 'Gastos',
		icon: 'bill',
		href: '/gastos',
	}, */
];

function Menu() {
	return (
		<div className="flex flex-col overflow-hidden">
			<h2 className="text-lg mb-2">Menú</h2>

			<div className="w-fit grid grid-cols-2 grid-rows-2 gap-2 mx-auto">
				{MenuOptions.map((option, index) => (
					<Option option={{ ...option, id: index }} key={index} />
				))}
			</div>
		</div>
	);
}

export default Menu;
