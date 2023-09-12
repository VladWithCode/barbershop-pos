'use client';
import React from 'react';
import CreateSingle from '../_components/Forms/CreateSingle';

function CrearProducto() {
	return (
		<div className="w-full px-4 py-2">
			<h1 className="text-lg font-normal mb-4">Agregar Producto</h1>
			<CreateSingle />
		</div>
	);
}

export default CrearProducto;
