import { ProductListWrapper } from './components/ProductList';

export default function products() {
	return (
		<div className="flex flex-col px-3 py-4 mx-auto w-full">
			<div className="flex flex-grow-0 h-8 mb-8">
				<h1 className="text-md font-light px-2">Todos los productos</h1>
				<div className="ml-auto">
					<input
						type="text"
						name="product_search"
						id="product_search"
						className="text-md px-3 py-1 rounded-md w-52 placeholder-opacity-75 border-2 border-white shadow-inner outline-none focus:border-b-gray-900"
						placeholder="Busca algun perfume..."
					/>
				</div>
			</div>
			<ProductListWrapper />
		</div>
	);
}
