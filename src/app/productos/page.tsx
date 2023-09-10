import ControlWrapper from './components/Controls/ControlWrapper';
import ProductList from './components/ProductList';

export default function products() {
	return (
		<div className="flex flex-col mx-auto w-full">
			<ControlWrapper />
			<ProductList />
		</div>
	);
}
