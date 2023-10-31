import React, { PropsWithChildren } from 'react';
import { getClassName } from '../_utils/helpers';

export type PageProps = {
	className?: string;
} & PropsWithChildren;

export default function Page({ children, className }: PageProps) {
	return (
		<div
			className={getClassName(
				'relative h-page max-w-screen-xl grid grid-cols-12 auto-rows-fr justify-between mx-auto py-2 gap-x-4 overflow-hidden',
				className
			)}>
			{children}
		</div>
	);
}
