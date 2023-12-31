import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getClassName } from '@/app/_utils/helpers';
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
					<div
						className="fixed top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-20 backdrop-blur-sm z-0"
						onClick={() => setIsMenuActive(false)}></div>
					<ul className="relative flex flex-col py-4 px-4 justify-center w-full bg-zinc-950 z-10 gap-y-2">
						<li
							className={getClassName(
								'relative px-3 py-1 font-bold uppercase rounded-sm group text-zinc-50',
								pathname === '/' && 'bg-rose-950'
							)}>
							<Link
								href="/"
								onClick={() => setIsMenuActive(false)}>
								Inicio
							</Link>
						</li>
						<li
							className={getClassName(
								'relative px-3 py-1 font-bold uppercase rounded-sm group text-zinc-50',
								pathname.startsWith('/ventas') && 'bg-rose-950'
							)}>
							<Link
								href="/ventas"
								onClick={() => setIsMenuActive(false)}>
								Ventas
							</Link>
						</li>
						<li
							className={getClassName(
								'relative px-3 py-1 font-bold uppercase rounded-sm group text-zinc-50',
								pathname.startsWith('/clientes') &&
									'bg-rose-950'
							)}>
							<Link
								href="/clientes"
								onClick={() => setIsMenuActive(false)}>
								Clientes
							</Link>
						</li>
						<li
							className={getClassName(
								'relative px-3 py-1 font-bold uppercase rounded-sm group text-zinc-50',
								pathname.startsWith('/productos') &&
									'bg-rose-950'
							)}>
							<Link
								href="/productos"
								onClick={() => setIsMenuActive(false)}>
								Productos
							</Link>
						</li>
						{/* <li
							className={getClassName(
								'relative px-3 py-1 font-bold uppercase rounded-sm group text-zinc-50',
								pathname.startsWith('/reportes') &&
									'bg-rose-950'
							)}>
							<Link
								href="/reportes"
								onClick={() => setIsMenuActive(false)}>
								Reportes
							</Link>
						</li> */}
					</ul>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}

export default NavMenu;
