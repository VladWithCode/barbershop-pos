'use client';
import React, { useState } from 'react';
import AddModal from './_components/AddModal';
import { AnimatePresence } from 'framer-motion';
import useCreateSaleStore from './_stores/useCreateSaleStore';
import SaleProducts from './_components/SaleProducts';
import { useCreateSale } from './_services/sale.service';
import { useToast } from '@/app/_components/Toast/Toast';
import { useRouter } from 'next/navigation';
import Page from '@/app/_components/Page';
import ConfirmModal from '../_components/ConfirmModal';
import CreateSale from './_components/CreateSale';
import Loading from '../_components/Loading/Loading';

const FieldsEs: Record<string, any> = {
	payment_method: 'Metodo de pago',
	customer: 'Cliente',
	seller: 'Vendedor',
	payment_type: 'Tipo de pago',
	deposit: 'Anticipo',
	commission: 'Comision',
	installment: 'Quincena',
	products: 'Productos',
};

function NuevaVenta() {
	const redirect = useRouter().push;
	const [isAddModalActive, setIsAddModalActive] = useState(false);
	const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);
	const {
		setField,
		setDeposit,
		setPaymentType,
		addProduct,
		removeProduct,
		clearState,
		updateProductQty,
		...fields
	} = useCreateSaleStore(state => state);
	const { mutateAsync, isLoading } = useCreateSale();
	const { pushToast } = useToast();

	const handleAddProduct = (product: any) => {
		addProduct(product);
	};

	const handleUpdateProduct = (product: any) => {
		updateProductQty(product._id, product.qty);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (fields.payment_type === 'cash' && fields.deposit !== fields.total) {
			pushToast({
				message:
					'La cantidad pagada debe ser la misma que el total de la venta',
				type: 'error',
			});
			return;
		}
		const notRequiredFields = ['next_payment_date', 'commission'];
		if (fields.payment_type === 'cash')
			notRequiredFields.push('installment');

		const requiredFields = Object.entries(fields).filter(
			([field]) => !notRequiredFields.includes(field)
		);

		const invalidFields = requiredFields
			.filter(([f, v]) => {
				if (typeof v === 'number') {
					return v === 0 || Number.isNaN(v);
				}

				if (typeof v === 'string') {
					return v.length === 0;
				}

				if (f === 'products') {
					return v.length === 0;
				}

				return false;
			})
			.map(([f]) => FieldsEs[f] || f);

		if (invalidFields.length > 0) {
			pushToast({
				message:
					'Algunos campos son invalidos: ' + invalidFields.join(', '),
				type: 'error',
			});
			return;
		}

		await mutateAsync(fields, {
			onSuccess: () => {
				pushToast({
					message: 'Venta realizada con éxito',
					type: 'success',
				});

				clearState();
				setIsConfirmModalActive(true);
			},
		});
	};

	return (
		<Page>
			{isLoading && (
				<div className="relative col-span-full row-start-1 backdrop-blur h-full w-full flex justify-center items-center z-10 bg-zinc-800 bg-opacity-30">
					<Loading />
				</div>
			)}
			<div className="col-span-6 col-start-1 row-start-1 px-4 py-2">
				<h1 className="text-xl font-medium">Registrar venta nueva</h1>
				<p className="text-zinc-500">
					Agrega una nueva venta a la base de datos.
				</p>
				<div className="py-2" />
				<CreateSale handleSubmit={handleSubmit} isLoading={isLoading} />
			</div>
			<div className="col-span-6 col-start-7 row-start-1 py-2 px-4">
				<div className="pt-[67px]" />
				<SaleProducts
					handleAddClick={() => setIsAddModalActive(true)}
					handleRemoveClick={removeProduct}
					handleUpdate={handleUpdateProduct}
					products={fields.products}
					total={fields.total}
					priceKey={
						fields.payment_type === 'cash'
							? 'sell_price_cash'
							: 'sell_price_credit'
					}
				/>
			</div>

			<AnimatePresence>
				{isAddModalActive ? (
					<AddModal
						isActive={isAddModalActive}
						setIsActive={setIsAddModalActive}
						onAdd={handleAddProduct}
					/>
				) : null}
			</AnimatePresence>
			{isConfirmModalActive && (
				<ConfirmModal
					message="La venta se registro con exito. ¿Deseas revisarla ahora?"
					onConfirm={() => {
						setIsConfirmModalActive(false);
						redirect('/ventas');
					}}
					onCancel={() => setIsConfirmModalActive(false)}
				/>
			)}
		</Page>
	);
}

export default NuevaVenta;
