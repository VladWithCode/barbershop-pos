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
			className="flex flex-col relative h-80 aspect-square xl:w-60 xl:h-60 cursor-pointer drop-shadow overflow-hidden transition-transform hover:scale-105 group bg-rose-700 rounded-md active:bg-rose-500">
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
					<svg className="m-auto w-20 h-20 fill-rose-950">
						<use href="/cologne.svg#cologne"></use>
					</svg>
					<p className="text-sm text-zinc-600 font-bold mb-1 mx-auto">
						{name}
					</p>
				</>
			)}
		</Link>
	);
}

export default ProductCard;
