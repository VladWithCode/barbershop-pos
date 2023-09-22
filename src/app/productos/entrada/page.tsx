'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductTable from '../_components/ProductTable/ProductTable';
import CreateForm from '../_components/Forms/CreateForm';
import ProductTypeSelector from '../_components/ProductTypeSelector';
import useInventoryEntranceStore from '../_stores/useInventoryEntranceStore';

export default function Entrada() {
	const { addProduct, removeProduct, newProducts, productsToUpdate } =
		useInventoryEntranceStore(state => state);
	const [productType, setProductType] = React.useState<
		'new' | 'existing' | null
	>(null);
	const onSelection = (type: 'new' | 'existing') => setProductType(type);
	const products = [...newProducts, ...productsToUpdate];

	return (
		<div className="w-full h-page overflow-hidden">
			<h1 className="text-lg font-medium py-2 px-8">
				Entrada de Inventario
			</h1>
			<div className="grid grid-cols-2 auto-cols-max px-8">
				<div className="col-span-full flex items-center h-12 px-12">
					<AnimatePresence>
						{productType !== null && (
							<motion.button
								type="button"
								className="relative flex text-lg font-medium uppercase text-zinc-300 hover:text-zinc-50"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{
									opacity: { duration: 0.2 },
									x: { duration: 0.3 },
								}}
								onClick={() => setProductType(null)}>
								<span className="my-auto">
									<svg className="w-6 h-6 fill-current -rotate-180">
										<use href="/sprites.svg#angle"></use>
									</svg>
								</span>
								<span>Volver</span>
							</motion.button>
						)}
					</AnimatePresence>
				</div>
				<div className="col-span-1 justify-self-center text-zinc-950">
					{/* Form selector */}
					<AnimatePresence mode="popLayout">
						{productType === null && (
							<motion.div
								className="relative"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}>
								<ProductTypeSelector
									onSelection={onSelection}
								/>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Form container */}
					<AnimatePresence mode="popLayout">
						{productType !== null && (
							<motion.div
								className="relative"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}>
								{productType === 'new' ? (
									<CreateForm
										onSubmit={data =>
											addProduct(
												{
													...data,
													_id: 'new-' + Date.now(),
													type: productType,
												},
												productType
											)
										}
									/>
								) : null}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<div className="col-span-1">
					<ProductTable
						className="mx-auto"
						productListing={products}
					/>

					<div className="pt-5 max-w-prose mx-auto">
						<ul className="list-disc text-zinc-400 font-light text-xs">
							<li>
								<p>
									Ten en cuenta que subir las imagenes de los
									productos puede ser tardado (Depende del
									tamaño y cantidad de imagenes que estas
									enviando)
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
