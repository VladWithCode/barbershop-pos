import { getClassName } from '@/app/_utils/helpers';
import { motion } from 'framer-motion';
import React from 'react';

function Spinner({
	width,
	borderWidth,
}: {
	width?: number;
	borderWidth?: number;
}) {
	return (
		<div
			className={getClassName(
				'max-w-full max-h-full aspect-square border-l-barber-red border-transparent rounded-full animate-spin',
				width ? `w-${width}` : 'w-8',
				borderWidth ? `border-${borderWidth}` : 'border-2'
			)}></div>
	);
}

export default Spinner;
