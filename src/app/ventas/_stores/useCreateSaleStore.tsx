import { createWithEqualityFn } from 'zustand/traditional';

export type Product = {
	_id: string;
	name: string;
	sell_price_credit: number;
	sell_price_cash: number;
	picture: string;
	stock_id: string;
	qty: number;
};

export type PaymentType = (typeof PaymentTypes)[keyof typeof PaymentTypes];
export type PaymentMethod =
	(typeof PaymentMethods)[keyof typeof PaymentMethods];

export type CreateSaleState = {
	customer: string;
	seller: string;
	payment_type: PaymentType;
	payment_method: PaymentMethod;
	deposit: number;
	installment: number;
	next_payment_date: string;
	commission: number;
	products: Product[];
	total: number;

	setField: (field: string, value: any) => void;
	setDeposit: (value: number) => void;
	addProduct: (product: Product & { default_sale_stock_id: string }) => void;
};

export const PaymentTypes = {
	CREDIT: 'credit',
	CASH: 'cash',
} as const;

export const PaymentMethods = {
	CARD: 'card',
	CASH: 'cash',
	TRANSFER: 'transfer',
} as const;

const INITIAL_CREATE_SALE_STATE = {
	customer: '',
	seller: '',
	payment_type: PaymentTypes.CASH,
	payment_method: PaymentMethods.CASH,
	deposit: 0,
	installment: 0,
	next_payment_date: '',
	commission: 0,
	products: [],
	total: 0,
};

const useCreateSaleStore = createWithEqualityFn<CreateSaleState>(
	(set, get) => ({
		...INITIAL_CREATE_SALE_STATE,

		setField: (field: string, value: any) => {
			if (field === 'deposit' || field === 'installment')
				return set({ [field]: +value * 100 });

			set({ [field]: value });
		},

		setDeposit(value: number) {
			const { payment_type, total } = get();
			const deposit = value * 100;

			if (payment_type === PaymentTypes.CASH) {
				return set({ deposit, installment: 0 });
			}

			const installment = Math.ceil((total - deposit) / 6);
			set({ deposit, installment });
		},

		addProduct: product => {
			const { products, payment_type, deposit } = get();
			// Get the correct sell price key depending on the payment type
			const sellPriceKey =
				payment_type === PaymentTypes.CASH
					? 'sell_price_cash'
					: 'sell_price_credit';

			let newTotal = 0;
			let newInstallment = 0;
			const exists = products.find(p => {
				// If the product already exists, return it
				if (p._id === product._id) {
					return true;
				}

				// Calculate the new total for the products that won't be modified
				newTotal += p.qty * p[sellPriceKey];
				return false;
			});

			const newState: Record<string, any> = {};
			if (exists) {
				const newProducts = products.map(p => {
					if (p._id === product._id) {
						let qty = p.qty + 1;

						newTotal += qty * p[sellPriceKey];

						return {
							...p,
							qty,
						};
					}
					newTotal += p.qty * p[sellPriceKey];

					return p;
				});

				newState['products'] = newProducts;
			} else {
				const newProduct = {
					_id: product._id,
					name: product.name,
					sell_price_credit: product.sell_price_credit,
					sell_price_cash: product.sell_price_cash,
					picture: product.picture,
					stock_id: product.default_sale_stock_id,
					qty: 1,
				};

				newTotal += newProduct[sellPriceKey];

				newState['products'] = [...products, newProduct];
			}

			if (payment_type === PaymentTypes.CREDIT) {
				newInstallment = Math.ceil((newTotal - deposit) / 6);

				newState['installment'] = newInstallment;
			}

			set({ ...newState, total: newTotal });
		},
	}),
	Object.is
);

export default useCreateSaleStore;
