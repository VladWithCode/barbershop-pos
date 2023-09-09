const HomeActions = [
	{
		name: 'Nueva Venta',
		icon: 'plus',
	},
	{
		name: 'Pago de Credito',
		icon: 'credit_card',
	},
	{
		name: 'Entrada de Mercancia',
		icon: 'pencil',
	},
];

const HomeMenu = [
	{
		name: 'Ventas',
		icon: 'plus',
	},
	{
		name: 'Productos',
		icon: 'credit_card',
	},
	{
		name: 'Clientes',
		icon: 'pencil',
	},
	{
		name: 'Creditos',
		icon: 'plus',
	},
	{
		name: 'Reportes',
		icon: 'credit_card',
	},
	{
		name: 'Gastos',
		icon: 'pencil',
	},
];

export default function Home() {
	return (
		<div className="overflow-hidden overflow-y-auto w-screen page-height bg-zinc-950">
			<h2 className="py-3 px-2 text-sm font-bold text-zinc-50">
				Bienvenido, usuario
			</h2>

			<div className="px-2 w-full overflow-hidden">
				<p className="text-xl mb-2">Acciones Rapidas</p>

				<div className="flex w-full overflow-auto gap-x-4">
					{HomeActions.map((action, index) => (
						<button
							key={index}
							className="flex flex-col items-center justify-center basis-2/3 aspect-square max-w-xs shrink-0 text-sm font-bold bg-rose-700 rounded-md text-rose-300 active:text-rose-50">
							<svg className="w-24 h-24 m-auto mb-0 fill-current">
								<use href={'/sprites.svg#' + action.icon}></use>
							</svg>
							<p className="text-lg m-auto mt-2">{action.name}</p>
						</button>
					))}
				</div>
			</div>

			<div className="px-2 py-4 w-full overflow-hidden">
				<h2 className="text-xl mb-2">Menú</h2>

				<div className="grid grid-cols-3 gap-2">
					{HomeMenu.map((menu, index) => (
						<button
							key={index}
							className="flex flex-col items-center justify-center basis-2/3 aspect-square max-w-xs shrink-0 text-sm font-bold bg-rose-700 rounded-md text-rose-300 active:text-rose-50">
							<svg className="w-12 h-12 m-auto mb-0 fill-current">
								<use href={'/sprites.svg#' + menu.icon}></use>
							</svg>
							<p className="text-lg m-auto mt-2">{menu.name}</p>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
