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
			className="flex flex-col items-center justify-center basis-2/3 aspect-square max-w-xs shrink-0 text-sm font-bold text-zinc-50 bg-zinc-950 rounded-md active:text-rose-50">
			<svg className="w-12 h-12 m-auto mb-0 fill-current">
				<use href={'/sprites.svg#' + option.icon}></use>
			</svg>
			<p className="text-lg m-auto mt-2">{option.name}</p>
		</Link>
	);
}

export default Option;
