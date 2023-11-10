import { useFloatingWindowStore } from '@/app/_FloatingWindows/stores/useFloatingWindowStore';
import { useAnimate } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Toggler from './Toggler';

const Buttons = [
	/* 	{
		label: 'Nueva Venta',
		icon: 'bill',
		id: 'NEW_SALE',
	}, */
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
	const [scope, animate] = useAnimate();
	const [isVisible, setIsVisible] = useState(true);
	const displayNamedWindow = useFloatingWindowStore(
		state => state.displayNamedWindow
	);
	const handleToggle = () => setIsVisible(prev => !prev);

	useEffect(() => {
		if (isVisible) animate(scope.current, { bottom: '12px' }, {});
		else animate(scope.current, { bottom: '-104px' });
	}, [isVisible]);

	return (
		<div className="absolute left-1/2 -translate-x-1/2 z-30" ref={scope}>
			<div className="relative p-3 pt-8 px-6 backdrop-blur bg-zinc-50 bg-opacity-5 rounded overflow-hidden">
				<Toggler isVisible={isVisible} onClick={handleToggle} />
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
