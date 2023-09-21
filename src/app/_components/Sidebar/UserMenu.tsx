import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/auth/_hooks/useAuth';

function UserMenu({
	isUserMenuActive,
	setIsUserMenuActive,
}: {
	isUserMenuActive: boolean;
	setIsUserMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const replace = useRouter().replace;
	const { didValidate, logout } = useAuth();

	const onLogout = () => {
		setIsUserMenuActive(false);
		logout();
		replace('/login');
	};

	return (
		<AnimatePresence>
			{isUserMenuActive ? (
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
					<ul className="relative flex flex-col py-4 px-6 justify-center w-full bg-zinc-950 text-zinc-50 z-10 gap-y-3">
						{didValidate ? (
							<>
								<li>
									<Link
										className="font-bold uppercase"
										href="/usuarios/me"
										onClick={() =>
											setIsUserMenuActive(false)
										}>
										Mi usuario
									</Link>
								</li>
								<li>
									<Link
										className="font-bold uppercase"
										href="/logout"
										onClick={() => onLogout()}>
										Cerrar sesión
									</Link>
								</li>
							</>
						) : (
							<li>
								<Link
									className="font-bold uppercase"
									href="/login">
									Iniciar sesión
								</Link>
							</li>
						)}
					</ul>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}

export default UserMenu;
