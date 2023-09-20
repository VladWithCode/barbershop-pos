'use client';

import { getClassName } from '@/app/_utils/helpers';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { create } from 'zustand';

let toastId = 0;

export type Toast = {
	id: number;
	type: (typeof ToastTypes)[keyof typeof ToastTypes];
	message: string;
};

export type ToastState = {
	toasts: Toast[];
};

export type ToastStore = ToastState & {
	pushToast: (toast: Toast) => void;
	removeToast: (id: number) => void;
	clearToasts: () => void;
};

export const ToastTypes = {
	SUCCESS: 'success',
	ERROR: 'error',
	INFO: 'info',
	WARNING: 'warning',
} as const;

const toastStore = create<ToastStore>(set => ({
	toasts: [],

	pushToast: (toast: Toast) =>
		set(state => ({ toasts: [...state.toasts, toast] })),
	removeToast: (id: number) =>
		set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),
	clearToasts: () => set({ toasts: [] }),
}));

export function useToast() {
	const [_, setClearQueue] = useState<
		{
			toastId: number;
			timeoutId: NodeJS.Timeout;
		}[]
	>([]);
	const _pushToast = toastStore(state => state.pushToast);
	const _removeToast = toastStore(state => state.removeToast);
	const _clearToasts = toastStore(state => state.clearToasts);
	const toasts = toastStore(state => state.toasts);

	const pushToast = (toast: { message: string; type: Toast['type'] }) => {
		const id = toastId++;
		_pushToast({ id, ...toast });

		const timeoutId = setTimeout(() => {
			_removeToast(id);
		}, 3000);

		setClearQueue(state => [...state, { toastId: id, timeoutId }]);
	};

	const removeToast = (id: number) => {
		_removeToast(id);
		setClearQueue(state => {
			const newState = [];

			for (let i of state) {
				if (i.toastId !== id) newState.push(i);
				else clearTimeout(i.timeoutId);
			}

			return newState;
		});
	};

	const clearToasts = () => {
		_clearToasts();
		setClearQueue(state => {
			for (let i of state) {
				clearTimeout(i.timeoutId);
			}

			return [];
		});
	};

	return { pushToast, removeToast, clearToasts, toasts };
}

const ToastStyles = {
	success: 'bg-green-300 text-green-700',
	error: 'bg-red-300 text-red-700',
	info: 'bg-blue-300 text-blue-700',
	warning: 'bg-yellow-300 text-yellow-700',
};

export default function ToastWrapper() {
	const toasts = toastStore(state => state.toasts);

	return (
		<div className="max-w-full fixed bottom-0 right-0 z-50 flex flex-col gap-y-2 p-4">
			<AnimatePresence>
				{toasts.map(t => (
					<Toast
						id={t.id}
						message={t.message}
						type={t.type}
						key={t.id}
					/>
				))}
			</AnimatePresence>
		</div>
	);
}

export function Toast({
	id,
	type,
	message,
}: {
	id: number;
	type: Toast['type'];
	message: string;
}) {
	return (
		<motion.p
			className={
				'relative grow p-2 rounded border-2 border-current ' +
				ToastStyles[type]
			}
			key={id}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -50 }}>
			{message}
		</motion.p>
	);
}
