import Menu from './components/Menu/Menu';
import ActionsList from './components/Quick Actions/ActionsList';

export default function Home() {
	return (
		<div className="overflow-hidden overflow-y-auto w-screen page-height bg-zinc-950">
			<h2 className="py-3 px-2 text-sm font-bold text-zinc-50">
				Bienvenido, usuario
			</h2>

			<ActionsList />

			<Menu />
		</div>
	);
}
