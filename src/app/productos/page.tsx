import ControlWrapper from './components/Controls/ControlWrapper';
import { ProductListWrapper } from './components/ProductList';

export default function products() {
	return (
		<div className="flex flex-col mx-auto w-full">
			<ControlWrapper />
			<ProductListWrapper />
		</div>
	);
}
