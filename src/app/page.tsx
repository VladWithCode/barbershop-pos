import Card from './components/Card';

const HomeActions = [
	{
		name: 'Nueva Venta',
		icon: 'plus',
	},
	{
		name: 'Pago de Credito',
		icon: 'credit-card',
	},
	{
		name: 'Entrada de Mercancia',
		icon: 'pencil',
	},
];

export default function Home() {
	return (
		<div className="overflow-hidden overflow-y-auto w-screen page-height bg-zinc-950">
			<p className="py-3 px-2 text-sm font-bold text-zinc-50">
				Bienvenido, usuario
			</p>

			<div className="px-2 w-full overflow-hidden">
				<p className="text-lg px-1 mb-2">Acciones Rapidas</p>

				<div className="flex w-full overflow-auto gap-x-4">
					{HomeActions.map((action, index) => (
						<button
							key={index}
							className="flex flex-col items-center justify-center basis-2/3 max-w-xs shrink-0 h-80 text-sm font-bold text-zinc-50 bg-rose-700 rounded-md">
							<span className="mr-2 text-xl material-icons">
								{action.icon}
							</span>
							<span>{action.name}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
