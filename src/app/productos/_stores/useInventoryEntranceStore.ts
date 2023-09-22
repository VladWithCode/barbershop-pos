import { create } from 'zustand';
import { Product } from '../_services/product.service';

const INITIAL_STATE: InventoryEntranceState = {
	productsToUpdate: [],
	newProducts: [],
	receviedBy: '',
	entranceDate: null,
	supplier: '',
};

const useInventoryEntranceStore = create<InventoryEntranceStore>(
	(set, get) => ({
		...INITIAL_STATE,
		addProduct: (product, productType) => {
			if (productType === 'new') {
				set(state => ({
					newProducts: [
						...state.newProducts,
						product as EntranceNewProduct,
					],
				}));
			} else {
				set(state => ({
					productsToUpdate: [
						...state.productsToUpdate,
						product as EntranceUpdateProduct,
					],
				}));
			}

			console.log(get().productsToUpdate, get().newProducts);
		},
		removeProduct: (id, productType) => {
			if (productType === 'new') {
				set(state => ({
					newProducts: state.newProducts.filter(p => p._id !== id),
				}));
			} else {
				set(state => ({
					productsToUpdate: state.productsToUpdate.filter(
						p => p._id !== id
					),
				}));
			}
		},
	})
);

export default useInventoryEntranceStore;

export type EntranceNewProduct = Product & { _id: string; type: 'new' };

export type EntranceUpdateProduct = Product & {
	_id: string;
	type: 'update';
};

export type InventoryEntranceStore = {
	productsToUpdate: EntranceUpdateProduct[];
	newProducts: EntranceNewProduct[];
	entranceDate: Date | null;
	receviedBy: string;
	supplier?: string;

	addProduct: (
		product: EntranceUpdateProduct | EntranceNewProduct,
		productType: ProductType
	) => void;
	removeProduct: (id: string, productType: ProductType) => void;
};

export type InventoryEntranceState = Omit<
	InventoryEntranceStore,
	'addProduct' | 'removeProduct'
>;

type ProductType = 'new' | 'update';
