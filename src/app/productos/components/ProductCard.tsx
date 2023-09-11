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
			className="flex flex-col shrink-0 relative w-full aspect-square xl:w-60 xl:h-60 cursor-pointer drop-shadow overflow-hidden transition-transform hover:scale-105 group bg-zinc-950 rounded-md">
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
					<svg className="m-auto w-20 h-20 fill-zinc-700">
						<use href="/cologne.svg#cologne"></use>
					</svg>
					<p className="text-sm text-zinc-600 font-bold mb-1 mx-auto overflow-hidden whitespace-break-spaces px-2">
						{name}
					</p>
				</>
			)}
		</Link>
	);
}

export default ProductCard;
