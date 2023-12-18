import { create } from 'zustand';

type ToolBtn = {
	id: string;
	label: string;
	needAdmin: boolean;
	handler?: () => void;
	data?: Record<string, any>;
};

type ToolboxState = {
	hasPageButtons: boolean;
	pageButtons: ToolBtn[];

	setPageButtons: (buttons: ToolBtn[]) => void;
	clearPageButtons: () => void;
};

export const useToolboxStore = create(() => {});
