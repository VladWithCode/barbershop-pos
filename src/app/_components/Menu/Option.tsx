import Link from 'next/link';
import React from 'react';

function Option({
	option,
}: {
	option: { id: number; name: string; icon: string; href: string };
}) {
	return (
		<Link
			href={option.href}
			key={option.id}
			className="flex flex-col items-center justify-center w-60 aspect-square max-w-xs shrink-0 text-sm font-bold text-zinc-800 bg-zinc-300 rounded p-4 hover:bg-zinc-200">
			<svg className="w-20 h-20 m-auto mb-0 fill-current">
				<use href={'/sprites.svg#' + option.icon}></use>
			</svg>
			<p className="text-lg m-auto mt-2">{option.name}</p>
		</Link>
	);
}

export default Option;
