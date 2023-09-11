import Menu from './components/Menu/Menu';
import ActionsList from './components/Quick Actions/ActionsList';

export default function Home() {
	return (
		<div className="overflow-hidden overflow-y-auto w-screen h-page">
			<h2 className="py-3 px-2 text-xs font-bold text-zinc-950">
				Bienvenido, usuario
			</h2>

			<ActionsList />

			<Menu />
		</div>
	);
}
