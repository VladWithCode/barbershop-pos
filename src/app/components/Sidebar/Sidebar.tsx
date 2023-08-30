import React from 'react';
import Image from 'next/image';

function Sidebar() {
	return (
		<div className="bg-neutral-950 px-6 py-4 border-r-2 border-zinc-900 w-48 h-full flex-grow-0 flex-shrink-0">
			<Image
				src="/logo-w.webp"
				width={128}
				height={128}
				alt="The Boss Logo"
				className="mx-auto w-20 h-20"
			/>

			{/* Main Menu */}

			{/* Contents change depending on section */}
		</div>
	);
}

export default Sidebar;
