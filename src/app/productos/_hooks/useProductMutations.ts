import { useMutation } from '@tanstack/react-query';
import {
	createBulkProducts,
	createProduct,
	uploadPicture,
} from '../_services/product.service';

export const useCreateProduct = () =>
	useMutation(['products', 'create'], createProduct);

export const useCreateBulkProducts = () =>
	useMutation(['products', 'createBulk'], createBulkProducts);

export const useUploadPicture = () =>
	useMutation(['products', 'uploadPicture'], uploadPicture);
