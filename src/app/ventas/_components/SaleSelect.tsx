import SearchableSelect, {
	TSelectOption,
} from '@/app/_components/Forms/SearchableSelect';
import { getClassName } from '@/app/_utils/helpers';
import { useCustomers } from '@/app/clientes/_hooks/useCustomers';
import { useUsers } from '@/app/usuarios/_hooks/useUsers';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

export default function SaleSelect() {
	return <div>SaleSelect</div>;
}

export function CustomerSelect({
	value,
	onChange,
}: {
	value: string;
	onChange: (option: TSelectOption) => void;
}) {
	const [isSelectActive, setIsSelectActive] = useState(false);
	const { data, isError, isLoading } = useCustomers();
	const options = data
		? data.map((customer: any) => ({
				id: customer._id,
				label: customer.fullname,
				value: customer._id,
		  }))
		: [];

	if (isLoading)
		return (
			<div className="relative w-full">
				<p className="text-sm">Cargando...</p>
			</div>
		);

	if (isError)
		return (
			<div className="relative w-full">
				<p className="text-sm">Error al recuperar los clientes.</p>
			</div>
		);

	return (
		<div className="relative flex w-full items-center">
			<AnimatePresence>
				{isSelectActive ? (
					<motion.div
						className="relative w-full"
						initial={{ opacity: 0, right: '-100%' }}
						animate={{ opacity: 1, right: '0%' }}
						exit={{ opacity: 0, right: '-100%' }}>
						<SearchableSelect
							id="customer"
							options={options}
							onChange={onChange}
						/>
					</motion.div>
				) : (
					<motion.input
						type="text"
						id="customer"
						name="customer"
						className="relative w-full bg-transparent border-2 border-transparent border-b-zinc-950 focus:ring-0 focus:border-zinc-50 focus:bg-zinc-800 focus:text-zinc-50 focus:rounded"
						value={value}
						onChange={e =>
							onChange({
								id: 'NO_ID',
								label: e.target.value,
								value: e.target.value,
							})
						}
						placeholder="Juan Perez"
						initial={{ opacity: 0, left: '-100%' }}
						animate={{ opacity: 1, left: '0%' }}
						exit={{ opacity: 0, left: '-100%' }}
					/>
				)}
			</AnimatePresence>

			<button
				className="px-2 z-10 peer-focus:text-zinc-50"
				type="button"
				onClick={() => setIsSelectActive(prev => !prev)}>
				<svg
					className={getClassName(
						'fill-current cursor-pointer',
						isSelectActive ? 'w-6 h-6' : 'w-8 h-8'
					)}>
					<use
						href={
							'/sprites.svg#' +
							(isSelectActive ? 'pencil' : 'search')
						}></use>
				</svg>
			</button>
		</div>
	);
	/* 	return (
		<SearchableSelect id="customer" options={options} onChange={onChange} />
	); */
}

export function UserSelect({
	onChange,
}: {
	onChange: (option: TSelectOption) => void;
}) {
	const { data, isError, isLoading } = useUsers();
	const options = data
		? data.data.map((user: any) => ({
				id: user._id,
				label: user.display_name + ` (${user.username})`,
				value: user._id,
		  }))
		: [];

	if (isLoading)
		return (
			<div className="relative w-full">
				<p className="text-sm">Cargando...</p>
			</div>
		);

	if (isError)
		return (
			<div className="relative w-full">
				<p className="text-sm">Error al recuperar los usuarios.</p>
			</div>
		);

	return (
		<SearchableSelect id="seller" options={options} onChange={onChange} />
	);
}
