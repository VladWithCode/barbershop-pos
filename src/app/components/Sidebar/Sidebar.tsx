'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import MainMenu from './MainMenu';
import { getClassName } from '@/app/utils/helpers';
import BackBtn from './BackBtn';
import UserBtn from './UserBtn';
import UserMenu from './UserMenu';

function Sidebar() {
	const [isActive, setIsActive] = useState(false);
	const [isUserMenuActive, setIsUserMenuActive] = useState(false);

	return (
		<>
			<div className="fixed top-0 left-0 h-24 w-full z-30 border-b-2 border-zinc-300">
				<div className="relative flex w-full h-full bg-neutral-950 z-20">
					<BackBtn />

					<MenuToggler setIsActive={setIsActive} />

					<UserBtn setUserMenuActive={setIsUserMenuActive} />
				</div>

				<UserMenu
					setIsUserMenuActive={setIsUserMenuActive}
					isUserMenuActive={isUserMenuActive}
				/>

				<div
					className={getClassName(
						'relative left-0 right-0 lg:border-r-2 border-zinc-900 z-0 transition-[top] duration-200',
						isActive ? 'top-0 ' : '-top-64'
					)}>
					<button
						onClick={() => setIsActive(false)}
						className={getClassName(
							'fixed top-0 left-0 h-screen w-full bg-zinc-900 bg-opacity-20 backdrop-blur-sm -z-10',
							isActive ? 'block' : 'hidden'
						)}
					/>

					<Image
						src="/logo-w.webp"
						width={128}
						height={128}
						alt="The Boss Logo"
						className="hidden mx-auto w-20 h-20"
					/>
					{/* Navigation Menu */}
					<MainMenu setSidebarActive={setIsActive} />

					{/* Contents change depending on section */}
				</div>
			</div>
			<div className="h-24 w-full bg-transparent mb-px"></div>
		</>
	);
}

export default Sidebar;

function MenuToggler({
	setIsActive,
}: {
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<button className="mx-auto" onClick={() => setIsActive(prev => !prev)}>
			<Image
				src="/logo-w.webp"
				width={128}
				height={128}
				alt="The Boss Logo"
				className="m-auto w-20 h-20"
				title="Menu"
				role="button"
			/>
			<svg className="mx-auto -mt-3 w-6 h-6 fill-zinc-50 rotate-90">
				<use href="/sprites.svg#angle"></use>
			</svg>
		</button>
	);
}
