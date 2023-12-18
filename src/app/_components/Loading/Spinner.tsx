import { getClassName } from '@/app/_utils/helpers';
import React from 'react';

function Spinner({
	className,
}: {
	width?: number;
	borderWidth?: number;
	className?: string;
}) {
	return (
		<div
			className={getClassName(
				'max-w-full max-h-full aspect-square border-l-barber-red border-transparent rounded-full animate-spin',
				className
			)}></div>
	);
}

export default Spinner;
