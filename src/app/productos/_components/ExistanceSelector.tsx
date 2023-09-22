import React from 'react';

export default function ExistanceSelector({
	onSelection,
}: {
	onSelection: (type: 'new' | 'existing') => void;
}) {
	return (
		<div className="flex overflow-hidden gap-x-4 font-medium">
			<button
				type="button"
				className={
					'w-64 flex flex-col items-center justify-center shrink-0 grow-0 bg-zinc-300 text-zinc-500 ' +
					'aspect-square py-24 ml-auto rounded-md gap-y-4 hover:text-zinc-950 cursor-pointer'
				}
				onClick={() => onSelection('new')}>
				<p className="text-lg uppercase">Producto Nuevo</p>
				<svg className="w-12 aspect-square fill-current">
					<use href="/sprites.svg#plus"></use>
				</svg>
			</button>

			<button
				type="button"
				className={
					'w-64 flex flex-col items-center justify-center shrink-0 grow-0 bg-zinc-300 text-zinc-500 ' +
					'aspect-square py-24 rounded-md gap-y-4 hover:text-zinc-950 cursor-pointer'
				}
				onClick={() => onSelection('existing')}>
				<p className="text-lg uppercase">Producto Existente</p>
				<svg className="w-12 aspect-square fill-current">
					<use href="/sprites.svg#cologne"></use>
				</svg>
			</button>
		</div>
	);
}
