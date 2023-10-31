import { useFloatingWindowStore } from '@/app/_FloatingWindows/stores/useFloatingWindowStore';
import React from 'react';

const Buttons = [
	{
		label: 'Nueva Venta',
		icon: 'bill',
		id: 'NEW_SALE',
	},
	{
		label: 'Registrar Abono',
		// icon: 'bill'
		id: 'NEW_PAYMENT',
	},
	{
		label: 'Registrar Cliente',
		icon: 'customer',
		id: 'NEW_CUSTOMER',
	},
	// {},
] as const;

export default function Toolbox() {
	const displayNamedWindow = useFloatingWindowStore(
		state => state.displayNamedWindow
	);

	return (
		<div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50">
			<div className="p-3 px-6 backdrop-blur bg-zinc-50 bg-opacity-5 rounded">
				<div className="flex gap-3">
					{Buttons.map(btn => (
						<button
							className="flex flex-col aspect-square w-20 bg-rose-950 rounded hover:scale-105 transition-transform"
							key={btn.id}
							onClick={() => displayNamedWindow(btn.id)}>
							<p className="text-xs font-bold text-center uppercase m-auto">
								{btn.label}
							</p>
						</button>
					))}
					<div className="h-20 bg-zinc-50 w-px mx-4" />
				</div>
			</div>
		</div>
	);
}
