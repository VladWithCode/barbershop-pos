import ProductList from './_components/ProductList';
import ActionsMenu from './_components/Menu/ActionsMenu';

export default function products() {
	return (
		<div className="w-full h-page">
			{/* <ControlWrapper /> */}
			<ActionsMenu />

			<ProductList />
		</div>
	);
}
