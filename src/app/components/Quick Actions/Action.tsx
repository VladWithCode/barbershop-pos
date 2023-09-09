import Link from 'next/link';
import React from 'react';

function Action({
	action,
}: {
	action: { id: number; name: string; icon: string; href: string };
}) {
	return (
		<Link
			href={action.href}
			key={action.id}
			className="flex flex-col items-center justify-center basis-2/3 aspect-square max-w-xs shrink-0 text-sm font-bold bg-rose-700 rounded-md text-rose-300 active:text-rose-50">
			<svg className="w-24 h-24 m-auto mb-0 fill-current">
				<use href={'/sprites.svg#' + action.icon}></use>
			</svg>
			<p className="text-lg m-auto mt-2">{action.name}</p>
		</Link>
	);
}

export default Action;
