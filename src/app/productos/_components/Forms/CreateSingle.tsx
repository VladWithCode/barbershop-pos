import React from 'react';
import {
	useCreateProduct,
	useUploadPicture,
} from '../../_hooks/useProductMutations';
import CreateForm from './CreateProductForm';

function CreateSingle() {
	const createProduct = useCreateProduct();
	const uploadPicture = useUploadPicture();

	return (
		<CreateForm
			onSubmit={console.log}
			createProduct={createProduct}
			uploadPicture={uploadPicture}
		/>
	);
}

export default CreateSingle;
