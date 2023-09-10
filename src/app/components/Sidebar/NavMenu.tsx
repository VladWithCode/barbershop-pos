import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getClassName } from '@/app/utils/helpers';
import { usePathname } from 'next/navigation';

function NavMenu({
	isMenuActive,
	setIsMenuActive,
}: {
	isMenuActive: boolean;
	setIsMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const pathname = usePathname();

	return (
		<AnimatePresence>
			{isMenuActive ? (
				<motion.div
					className="absolute w-full h-screen z-10"
					initial={{
						top: '-100%',
					}}
					animate={{
						top: '100%',
					}}
					exit={{
						top: '-100%',
					}}>
					<div className="fixed top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-20 backdrop-blur-sm z-0"></div>
					<ul className="relative flex flex-col py-4 px-4 justify-center w-full bg-neutral-950 z-10 gap-y-2 text-center">
						<li
							className={getClassName(
								'relative px-3 py-1 font-bold uppercase rounded-sm group',
								pathname === '/' && 'bg-rose-700'
							)}>
							<Link href="/">Inicio</Link>
						</li>
						<li
							className={getClassName(
								'relative px-3 py-1 font-bold uppercase rounded-sm group',
								pathname.startsWith('/ventas') && 'bg-rose-700'
							)}>
							<Link href="/ventas">Ventas</Link>
						</li>
						<li
							className={getClassName(
								'relative px-3 py-1 font-bold uppercase rounded-sm group',
								pathname.startsWith('/clientes') &&
									'bg-rose-700'
							)}>
							<Link href="/clientes">Clientes</Link>
						</li>
						<li
							className={getClassName(
								'relative px-3 py-1 font-bold uppercase rounded-sm group',
								pathname.startsWith('/productos') &&
									'bg-rose-700'
							)}>
							<Link href="/productos">Productos</Link>
						</li>
						<li
							className={getClassName(
								'relative px-3 py-1 font-bold uppercase rounded-sm group',
								pathname.startsWith('/reportes') &&
									'bg-rose-700'
							)}>
							<Link href="/reportes">Reportes</Link>
						</li>
					</ul>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}

export default NavMenu;
