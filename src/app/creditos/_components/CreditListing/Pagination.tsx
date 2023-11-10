import React from 'react';

export default function Pagination() {
	return (
		<div className="flex justify-between">
			<button type="button" className="bg-zinc-800 text-zinc-50 rounded">
				<svg className="fill-current h-10 w-10 rotate-180">
					<use href="/sprites.svg#angle"></use>
				</svg>
			</button>
			<button type="button" className="bg-zinc-800 text-zinc-50 rounded">
				<svg className="fill-current h-10 w-10">
					<use href="/sprites.svg#angle"></use>
				</svg>
			</button>
		</div>
	);
}
