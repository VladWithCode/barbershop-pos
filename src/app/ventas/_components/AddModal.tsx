import Loading from '@/app/_components/Loading/Loading';
import useDebounce from '@/app/_hooks/useDebounce';
import globals from '@/app/globals';
import ProductList from '@/app/productos/_components/ProductList';
import { useProducts } from '@/app/productos/_hooks/useProducts';
import Image from 'next/image';
import React, { useState } from 'react';

export default function AddModal({
	isActive,
	setIsActive,
	onAdd,
}: {
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	onAdd: (product: {}) => void;
}) {
	const [search, setSearch] = React.useState('');
	const { data, isError, isLoading } = useProducts({ search });
	const products = data?.products;
	const handleProductClick = (product: any) => {
		onAdd(product);
		setIsActive(false);
	};

	return (
		<div className="fixed top-0 left-0 h-screen w-screen flex backdrop-blur-sm bg-zinc-950 bg-opacity-25 z-50">
			<div
				className="absolute top-0 left-0 right-0 bottom-0 z-0"
				onClick={() => setIsActive(false)}></div>

			<div className="relative flex flex-col bg-zinc-300 text-zinc-950 h-3/5 max-w-3xl w-full mx-auto top-1/2 -translate-y-1/2 px-4 py-2 rounded overflow-hidden">
				{/* Header */}
				<div className="flex items-center shrink flex-auto">
					<h3 className="text-lg font-medium">Agregar Productos</h3>
					<button
						className="ml-auto w-5 h-5"
						onClick={() => setIsActive(false)}>
						<svg className="w-full h-full fill-current rotate-45">
							<use href="/sprites.svg#plus"></use>
						</svg>
					</button>
				</div>

				{/* Search bar */}
				<div className="flex shrink basis-auto">
					<DebouncedSearch onSearch={s => setSearch(s)} />
					<div className="w-12 h-12 flex grow-0 bg-transparent text-zinc-950 peer-focus:bg-zinc-800 peer-focus:text-zinc-50 peer-focus:border-zinc-50 rounded-r transition duration-75 -ml-1">
						<svg className="w-8 aspect-square m-auto fill-current">
							<use href="/sprites.svg#search"></use>
						</svg>
					</div>
				</div>
				<div className="py-1" />
				{/* Product List */}
				<div className="grid grid-cols-4 gap-2 flex-auto py-4 overflow-hidden overflow-y-auto custom-scroll-bar">
					{isLoading ? <Loading /> : null}
					{isError ? (
						<p className="text-sm text-zinc-950">
							Ocurrio un error al recuperar los productos.
						</p>
					) : null}
					{products && products.length > 0 ? (
						products.map((p: any) => (
							<div
								className="relative flex aspect-square cursor-pointer hover:scale-105 active:text-zinc-500"
								key={p._id}
								onClick={() => handleProductClick(p)}>
								{p.picture ? (
									<Image
										className="w-full h-full object-contain"
										alt={p.name + ' picture'}
										src={globals.API_BASE_URL + p.picture}
										width={200}
										height={200}
									/>
								) : (
									<div className="w-full h-full flex flex-col overflow-hidden">
										<svg className="m-auto w-16 h-16 fill-current">
											<use href="/cologne.svg#cologne"></use>
										</svg>
										<p className="text-xs font-bold mx-auto overflow-hidden whitespace-break-spaces px-2">
											{p.name}
										</p>
									</div>
								)}
							</div>
						))
					) : (
						<p className="text-sm">No se encontraron productos.</p>
					)}
				</div>
			</div>
		</div>
	);
}

function DebouncedSearch({ onSearch }: { onSearch: (search: string) => void }) {
	const [search, setSearch] = useState('');

	useDebounce(() => onSearch(search), 700, [search]);

	return (
		<input
			name="product_search"
			id="product_search"
			type="text"
			className={
				'h-12 grow bg-transparent border-2 border-transparent border-b-zinc-950 ' +
				'focus:rounded focus:border-zinc-50 focus:bg-zinc-800 focus:text-zinc-50 focus:ring-0 focus:outline-none transition duration-75 peer'
			}
			placeholder="Buscar por nombre..."
			onChange={e => setSearch(e.target.value)}
			value={search}
		/>
	);
}
