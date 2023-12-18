'use client';
import { AnimatePresence, useAnimate } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useFloatingWindowStore } from './stores/useFloatingWindowStore';
import ConfirmModal from '../_components/ConfirmModal';

export default function Wrapper() {
	const isVisible = useFloatingWindowStore(state => state.isVisible);
	const WindowElement = useFloatingWindowStore(state => state.currentWindow);
	const hideWindow = useFloatingWindowStore(state => state.hideWindow);
	const [showConfirm, setShowConfirm] = useState(false);
	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (isVisible) {
			animate(
				scope.current,
				{ height: '100vh', opacity: 1, visibility: 'visible' },
				{ duration: 0.2 }
			);
		} else {
			animate(
				scope.current,
				{ height: '0vh', opacity: 0 },
				{ duration: 0.2, height: { delay: 0.2 } }
			);
		}
	}, [isVisible]);

	useEffect(() => {
		if (showConfirm) {
			animate(
				'#CONFIRM_MODAL_COMPONENT',
				{
					opacity: 1,
					visibility: 'visible',
					pointerEvents: 'auto',
				},
				{ duration: 0.1 }
			);
		} else {
			animate(
				'#CONFIRM_MODAL_COMPONENT',
				{
					opacity: 0,
					pointerEvents: 'none',
				},
				{ duration: 0.1 }
			);
		}
	}, [showConfirm]);

	return (
		<div
			className="absolute inset-0 w-screen z-30 flex items-center justify-center overflow-hidden invisible"
			ref={scope}>
			<div
				className="absolute inset-0 w-full h-full backdrop-blur-sm bg-zinc-800 bg-opacity-30 -z-10"
				onClick={() => setShowConfirm(true)}
			/>
			<AnimatePresence>
				{isVisible && WindowElement && <WindowElement />}
			</AnimatePresence>

			<ConfirmModal
				message="¿Deseas cerrar la ventana? (Se perdera cualquier información no guardada)"
				onConfirm={() => {
					setShowConfirm(false);
					hideWindow();
				}}
				onCancel={() => setShowConfirm(false)}
			/>
		</div>
	);
}
