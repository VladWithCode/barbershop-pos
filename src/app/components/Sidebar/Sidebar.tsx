'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import MainMenu from './MainMenu';
import { getClassName } from '@/app/utils/helpers';

function Sidebar() {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="relative top-0 left-0 h-24 w-full z-30">
			<div
				className="sticky mx-auto z-10 w-full h-full bg-neutral-950"
				onClick={() => setIsActive(prev => !prev)}>
				<Image
					src="/logo-w.webp"
					width={128}
					height={128}
					alt="The Boss Logo"
					className="m-auto w-20 h-20"
					title="Menu"
					role="button"
				/>
				<svg className="mx-auto -mt-4 w-6 h-6 fill-zinc-50 rotate-90">
					<use href="/sprites.svg#angle"></use>
				</svg>
			</div>
			<hr />

			<div
				className={getClassName(
					'relative left-0 right-0 bg-neutral-950 px-6 py-4 border-r-2 border-zinc-900 z-0 transition-[top] duration-200',
					isActive ? 'top-0 ' : '-top-64'
				)}>
				<Image
					src="/logo-w.webp"
					width={128}
					height={128}
					alt="The Boss Logo"
					className="hidden mx-auto w-20 h-20"
				/>

				{/* Main Menu */}
				<MainMenu setSidebarActive={setIsActive} />

				{/* Contents change depending on section */}
			</div>
		</div>
	);
}

export default Sidebar;
