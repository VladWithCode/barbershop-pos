import AxiosInstance from '@/app/_utils/api';
import {
	PaymentMethod,
	PaymentType,
	Product,
} from '../_stores/useCreateSaleStore';
import { useMutation } from '@tanstack/react-query';

export type SaleData = {
	customer: string;
	seller: string;
	products: Product[];
	payment_type: PaymentType;
	payment_method: PaymentMethod;
	deposit: number;
	commission: number;
	installment?: number;
	next_payment_date?: string;
};

export async function createSale(saleData: SaleData) {
	const priceKey =
		saleData.payment_type === 'cash'
			? 'sell_price_cash'
			: 'sell_price_credit';
	const response = await AxiosInstance.post('/sales', {
		...saleData,
		items: saleData.products.map(p => {
			return {
				product: p._id,
				stock_entry_id: p.stock_entry_id,
				quantity: p.qty,
				total: p[priceKey] * p.qty,
				sale_price: p.sale_price || 0,
			};
		}),
	});

	return response.data;
}

export const useCreateSale = () => useMutation(['sales', 'create'], createSale);
