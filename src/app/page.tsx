import Menu from './_components/Menu/Menu';
import Page from './_components/Page';

export default function Home() {
	return (
		<Page className="grid-rows-[max-content_min-content] gap-y-4">
			<div className="col-span-full py-2">
				<h1 className="font-light text-xl">Barberia The Boss</h1>
				<div className="py-2" />
				<Menu />
			</div>
		</Page>
	);
}
