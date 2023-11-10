import React from 'react';
import Page from '../_components/Page';
import CreditListing from './_components/CreditListing/CreditListing';

export default function Creditos() {
	return (
		<Page>
			<div className="flex flex-col col-span-6 row-start-1 px-4 py-2">
				<h1 className="text-xl font-medium">Creditos</h1>
				<p className="text-zinc-500">
					Listado de creditos por cliente.
				</p>
				<div className="py-2" />
				<CreditListing />
			</div>
		</Page>
	);
}
