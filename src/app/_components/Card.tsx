import React from 'react';
import { getClassName } from '../_utils/helpers';

function Card({
	className,
	children,
}: { className?: string } & React.PropsWithChildren) {
	return (
		<div className={getClassName('bg-neutral-950 px-6 py-4', className)}>
			{children}
		</div>
	);
}

export default Card;
