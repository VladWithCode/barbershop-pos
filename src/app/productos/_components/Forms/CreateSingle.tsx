import React from 'react';
import {
	useCreateProduct,
	useUploadPicture,
} from '../../_hooks/useProductMutations';
import CreateForm from './CreateForm';

function CreateSingle() {
	const createProduct = useCreateProduct();
	const uploadPicture = useUploadPicture();

	return (
		<CreateForm
			createProduct={createProduct}
			uploadPicture={uploadPicture}
		/>
	);
}

export default CreateSingle;