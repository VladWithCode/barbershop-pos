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
			className="flex flex-col items-center justify-center w-28 aspect-square max-w-xs shrink-0 text-sm font-bold bg-zinc-200 rounded-md text-zinc-950 active:text-rose-50">
			<svg className="w-8 h-8 m-auto mb-0 fill-current">
				<use href={'/sprites.svg#' + action.icon}></use>
			</svg>
			<p className="text-sm m-auto mt-2 text-center">{action.name}</p>
		</Link>
	);
}

export default Action;
