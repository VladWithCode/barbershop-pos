import { create } from 'zustand';
import NewCustomerWindow from '../../clientes/_windows/NewCustomer';
import SalePicker from '@/app/ventas/_windows/NewPayment';

export type FloatingWindowNames = 'NEW_CUSTOMER' | 'NEW_SALE' | 'NEW_PAYMENT';

export const FloatingWindows = new Map<string, React.FC>(
	Object.entries({
		NEW_CUSTOMER: NewCustomerWindow,
		NEW_PAYMENT: SalePicker,
	})
);

export type FloatingWindowState = {
	currentWindow: React.FC | null;
	windowContext: Record<string, any> | null;
	isVisible: boolean;

	// Simple Fn's
	// setCurrentWindow: (formName: FloatingWindowNames) => void;
	setCurrentWindow: (windowComponent: React.FC) => void;
	setIsVisible: (isVisible: boolean) => void;
	setWindowContext: (context: Record<string, any>) => void;

	// Compound Fn's
	displayWindow: (
		windowComponent: React.FC,
		context?: Record<string, any>
	) => void;
	displayNamedWindow: (
		windowName: FloatingWindowNames,
		context?: Record<string, any>
	) => void;
	hideWindow: () => void;
};

export const useFloatingWindowStore = create<FloatingWindowState>(
	(set, get) => ({
		currentWindow: null,
		windowContext: null,
		isVisible: false,

		setCurrentWindow: windowComponent =>
			set({ currentWindow: windowComponent }),
		setWindowContext: (context: Record<string, any>) =>
			set({ windowContext: context }),
		setIsVisible: isVisible => set({ isVisible: isVisible }),

		displayWindow: (window, context) =>
			set({
				isVisible: true,
				currentWindow: window,
				windowContext: context,
			}),
		displayNamedWindow: (windowName, context) => {
			set({
				isVisible: true,
				currentWindow: FloatingWindows.get(windowName),
				windowContext: context,
			});
		},
		hideWindow: () => {
			let handleWindowHide = get().windowContext?.handleWindowHide;
			if (typeof handleWindowHide === 'function') handleWindowHide();

			set({
				isVisible: false,
				currentWindow: null,
				windowContext: null,
			});
		},
	})
);
