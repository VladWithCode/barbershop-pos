'use client';
import ProductList from './_components/ProductList';
import ActionsMenu from './_components/Menu/ActionsMenu';
import { useState } from 'react';
import Searchbar from '../_components/Searchbar';
import Page from '../_components/Page';

export default function Products() {
	const [search, setSearch] = useState('');

	return (
		<Page>
			{/* <ControlWrapper /> */}
			<div className="flex flex-col col-span-7 px-4 py-2 overflow-hidden">
				<h1 className="text-xl font-medium shrink grow-0 basis-auto">
					Productos
				</h1>
				<p className="text-zinc-500 shrink grow-0 basis-auto">
					Listado de productos
				</p>
				<div className="py-2" />
				<Searchbar
					onSearch={s => setSearch(s)}
					placeholder="Buscar producto..."
				/>
				<div className="py-2" />
				<div className="flex-auto overflow-y-auto custom-scroll-bar pr-1">
					<ProductList search={search} />
				</div>
			</div>
			<div className="col-span-5 px-4 py-2">
				<h2 className="text-lg text-right">Acciones</h2>
				<div className="py-2" />
				<ActionsMenu />
			</div>
		</Page>
	);
}
