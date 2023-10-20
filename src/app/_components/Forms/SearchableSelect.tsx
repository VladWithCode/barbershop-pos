import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export type TSelectOption<T = any> = {
	id: string;
	label: string;
	value: T;
};

function SearchableSelect({
	options,
	id,
	onChange,
	preselectedOption,
}: {
	options: TSelectOption[];
	id: string;
	onChange: (opt: TSelectOption, id: string) => void;
	preselectedOption?: TSelectOption;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = React.useState('');
	const [selectedOption, setSelectedOption] = useState<TSelectOption | null>(
		preselectedOption || null
	);
	const filteredOptions = options.filter(opt =>
		opt.label.toLowerCase().includes(search.toLowerCase())
	);

	useEffect(() => {
		if (preselectedOption !== undefined)
			setSelectedOption(preselectedOption);
	}, [preselectedOption]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setSelectedOption(null);
	};

	const handleOptionClick = (opt: TSelectOption) => {
		setSelectedOption(opt);
		onChange(opt, id);
		setIsOpen(false);
	};

	return (
		<div className="relative w-full">
			<button
				type="button"
				onClick={() => setIsOpen(prev => !prev)}
				className="relative w-full flex items-center max-w-full z-10 bg-zinc-800 text-zinc-50 border-2 border-zinc-400 rounded py-1 px-3 focus:outline-none focus:border-zinc-50">
				<span>{selectedOption?.label || 'Seleccionar...'}</span>
				<svg className="w-6 h-6 ml-auto rotate-90 fill-current">
					<use href="/sprites.svg#angle"></use>
				</svg>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="absolute w-full left-0 z-50"
						initial={{ opacity: 0, top: '0%' }}
						animate={{ opacity: 1, top: '100%' }}
						exit={{ opacity: 0, top: '0%' }}
						transition={{ duration: 0.2 }}>
						<ul className="w-full max-h-64 overflow-y-auto bg-zinc-800 text-zinc-50 rounded mt-1">
							<li className="py-1 px-3 cursor-text">
								<input
									type="text"
									className="w-full bg-transparent border-0 border-b-[1px] focus:border-zinc-50 focus:outline-none focus:ring-0 transition duration-75"
									placeholder="Buscar..."
									value={search}
									onChange={handleSearchChange}
								/>
							</li>
							{filteredOptions.map(opt => (
								<li
									key={opt.id}
									onClick={() => handleOptionClick(opt)}
									className="py-2 px-3 hover:bg-zinc-400 cursor-pointer">
									{opt.label}
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default SearchableSelect;
