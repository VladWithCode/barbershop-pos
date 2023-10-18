'use client';
import React, { useState } from 'react';
import Page from '../_components/Page';
import Searchbar from '../_components/Searchbar';

export default function Categorias() {
	const [search, setSearch] = useState('');
	return (
		<Page>
			<div className="col-span-6 px-4 py-2 overflow-hidden">
				<h1 className="font-medium text-lg">Categorias de Mercancia</h1>
				<p className="text-zinc-500">Listado de Categorias</p>
				<div className="py-2" />
				<Searchbar onSearch={s => setSearch(s)} />
				<div className="py-2" />
				<div className="flex-auto overflow-y-auto custom-scroll-bar pr-1"></div>
			</div>
		</Page>
	);
}
