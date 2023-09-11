import { create } from 'zustand';

const INITIAL_CREATE_PRODUCT_STATE = {
	name: '',
	description: '',
	category: '',
	buy_price: 0,
	sell_price_cash: 0,
	sell_price_credit: 0,
	sale_units: 0,
	supply_units: 0,
};

const useCreateProductStore = create<TCreateProductStore>(set => ({
	...INITIAL_CREATE_PRODUCT_STATE,
	setField: (field, value) => set(() => ({ [field]: value })),
}));

export default useCreateProductStore;

export type TCreateProductFields = typeof INITIAL_CREATE_PRODUCT_STATE;

export type TCreateProductStore = TCreateProductFields & {
	setField: (field: string, value: string | number) => void;
};
