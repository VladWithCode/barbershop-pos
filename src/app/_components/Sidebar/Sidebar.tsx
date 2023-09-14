'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import MainMenu from './MainMenu';
import { getClassName } from '@/app/_utils/helpers';
import BackBtn from './BackBtn';
import UserBtn from './UserBtn';
import UserMenu from './UserMenu';
import NavMenu from './NavMenu';

function Sidebar() {
	const [isNavMenuActive, setIsNavMenuActive] = useState(false);
	const [isUserMenuActive, setIsUserMenuActive] = useState(false);

	return (
		<>
			<div className="fixed top-0 left-0 h-24 w-full z-30 border-b-2 border-zinc-300">
				<div className="relative flex w-full h-full bg-neutral-950 z-20">
					<BackBtn />

					<MenuToggler setIsActive={setIsNavMenuActive} />

					<UserBtn setUserMenuActive={setIsUserMenuActive} />
				</div>

				<UserMenu
					setIsUserMenuActive={setIsUserMenuActive}
					isUserMenuActive={isUserMenuActive}
				/>

				<NavMenu
					isMenuActive={isNavMenuActive}
					setIsMenuActive={setIsNavMenuActive}
				/>
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
