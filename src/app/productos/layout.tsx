import { Metadata } from 'next';
import React from 'react';
import SearchBar from './components/Controls/SearchBar';

export const metadata: Metadata = {
	title: 'The Boss | Productos',
};

function ProductLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<SearchBar />

			{children}
		</>
	);
}

export default ProductLayout;
