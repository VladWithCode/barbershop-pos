import AxiosInstance from '@/app/_utils/api';
import {
	PaymentMethod,
	PaymentType,
	Product,
} from '../_stores/useCreateSaleStore';
import { useMutation, useQuery } from '@tanstack/react-query';

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

export type Sale = {
	_id: string;
	items: any[];
	customer: string;
	customer_name: string;
	seller: string;
	payment_type: PaymentType;
	deposit: number;
	deposit_date: Date;
	installment: number;
	paid_amount: number;
	pending_amount: number;
	total_amount: number;
	next_payment_date: number;
	last_payment_data: number;
	payments: any[];
	commission: number;
	total_utility: number;
	credit_start_date: Date;
	credit_end_date: Date;
	status: 'paid' | 'pending_payment' | 'over_due';
};

export async function getSale(id: string) {
	const response = await AxiosInstance.get<Sale>('/sales/' + id);

	return response.data;
}

export async function getSales({
	search,
}: {
	search?: string;
}): Promise<Sale[]> {
	const params = new URLSearchParams();

	if (search) params.append('search', search);

	const response = await AxiosInstance.get<Sale[]>(
		'/sales?' + params.toString()
	);

	return response.data;
}

export const useSales = (params?: { search?: string }) => {
	const { search } = params || {};

	return useQuery<Sale[], { message: string; error: any }>(
		['sales', 'get', params],
		() => getSales({ search })
	);
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
