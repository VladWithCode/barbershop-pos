import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'The Boss | Productos',
};

function ProductLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}

export default ProductLayout;
