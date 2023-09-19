import AxiosInstance from '@/app/_utils/api';
import { PaymentMethod, PaymentType } from '../_stores/useCreateSaleStore';
import { useMutation } from '@tanstack/react-query';

export type SaleData = {
	customer: string;
	seller: string;
	products: Record<string, number>[];
	payment_type: PaymentType;
	payment_method: PaymentMethod;
	deposit: number;
	total: number;
	commission: number;
	installment?: number;
	next_payment_date?: Date;
};

export async function createSale(saleData: SaleData) {
	const response = await AxiosInstance.post('/sales', saleData);

	return response.data;
}

export const useCreateSale = () => useMutation(['sales', 'create'], createSale);
