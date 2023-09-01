'use client';
import { getClassName } from '@/app/utils/helpers';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Links = [
	{
		label: 'Inicio',
		href: '/',
	},
	{
		label: 'Ventas',
		href: '/ventas',
	},
	{
		label: 'Clientes',
		href: '/clientes',
	},
	{
		label: 'Productos',
		href: '/productos',
	},
	{
		label: 'Reportes',
		href: '/reportes',
	},
];

function MainMenu() {
	const pathname = usePathname();

	return (
		<ul className="flex flex-col gap-y-3">
			{Links.map(l => (
				<Link
					className={getClassName(
						'relative px-3 py-1 font-bold uppercase rounded-sm group',
						(l.href === pathname ||
							pathname.startsWith(
								'/' + l.label.toLocaleLowerCase()
							)) &&
							'bg-zinc-800'
					)}
					href={l.href}
					key={l.href}>
					<div className="absolute top-0 left-0 w-0 h-full bg-zinc-800 rounded-sm transition-[width] group-hover:w-full z-0"></div>
					<span className="relative z-10">{l.label}</span>
				</Link>
			))}
		</ul>
	);
}

export default MainMenu;
