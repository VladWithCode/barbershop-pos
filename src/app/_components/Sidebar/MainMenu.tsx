'use client';
import { getClassName } from '@/app/_utils/helpers';
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

function MainMenu({
	setSidebarActive,
}: {
	setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const pathname = usePathname();

	return (
		<ul className="relative w-full flex flex-col px-6 py-4 gap-y-3 z-10">
			{Links.map(l => (
				<Link
					className={getClassName(
						'relative px-3 py-1 font-bold uppercase rounded-sm group',
						// If the current pathname is the same as the link's href
						(l.href === pathname ||
							pathname.startsWith(
								'/' + l.label.toLocaleLowerCase()
							)) &&
							'bg-barber-red' // Use a different bg color
					)}
					href={l.href}
					key={l.href}
					onClick={() => setSidebarActive(false)}>
					<div className="absolute top-0 left-0 w-0 h-full bg-zinc-800 rounded-sm transition-[width] group-hover:w-full z-0"></div>
					<span className="relative z-10">{l.label}</span>
				</Link>
			))}
		</ul>
	);
}

export default MainMenu;
