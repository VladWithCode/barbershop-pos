import AxiosInstance from '@/app/_utils/api';
import globals from '@/app/globals';

export type Product = {
	name: string;
	description: string;
	buy_price: number;
	sell_price_cash: number;
	sell_price_credit: number;
	sale_units: number;
	supply_units: number;
	category: string;
};

export async function createProduct(productData: Product) {
	const response = await AxiosInstance.post(
		globals.API_BASE_URL + '/products',
		productData
	);

	if (response.status !== 201) {
		throw new Error('Error al crear el producto');
	}

	return response.data;
}

export async function createBulkProducts(productsData: Product[]) {
	const response = await AxiosInstance.post(
		globals.API_BASE_URL + '/products/bulk',
		productsData
	);

	if (response.status !== 201) {
		throw new Error('Error al crear los productos');
	}

	return response.data;
}

export async function uploadPicture(picture: File) {
	const formData = new FormData();
	formData.append('picture', picture);

	const response = await AxiosInstance.post(
		globals.API_BASE_URL + '/products/picture',
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	);

	if (response.status !== 201) {
		throw new Error('Error al subir la imagen');
	}

	return response.data;
}
