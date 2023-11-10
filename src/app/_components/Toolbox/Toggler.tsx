'use client';
import { getClassName } from '@/app/_utils/helpers';
import React from 'react';

export default function Toggler({
	isVisible,
	onClick,
}: {
	onClick: () => void;
	isVisible: boolean;
}) {
	return (
		<button
			className="flex absolute top-0 left-0 h-5 w-full text-zinc-50 bg-zinc-50 bg-opacity-0 hover:bg-opacity-30 justify-center items-center"
			onClick={onClick}>
			<svg
				className={getClassName(
					'h-5 w-5 fill-current transition-transform',
					!isVisible ? '-rotate-90' : 'rotate-90'
				)}>
				<use href="/sprites.svg#angle"></use>
			</svg>
		</button>
	);
}
