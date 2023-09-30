import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductCard({
	name,
	picture,
	_id,
}: {
	name: string;
	picture: string;
	_id: string;
}) {
	return (
		<Link
			href={'/productos/' + _id}
			className="flex flex-col relative aspect-square cursor-pointer overflow-hidden transition-transform hover:scale-105 text-zinc-400 bg-rose-950 rounded-md hover:text-zinc-200">
			{picture?.length > 0 ? (
				<Image
					src={'http://localhost:3000' + picture}
					width={800}
					height={800}
					alt={name}
					className="h-full w-auto mx-auto text-center"
				/>
			) : (
				<>
					<svg className="m-auto w-20 h-20 fill-current">
						<use href="/cologne.svg#cologne"></use>
					</svg>
					<p className="text-sm font-bold mb-1 mx-auto overflow-hidden whitespace-break-spaces px-2">
						{name}
					</p>
				</>
			)}
		</Link>
	);
}

export default ProductCard;
