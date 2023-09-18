import React, { useState } from 'react';
import { TSelectOption } from './SearchableSelect';
import { AnimatePresence, motion } from 'framer-motion';

export default function Select({
	options,
	id,
	onSelect,
	defaultValue,
}: {
	options: TSelectOption[];
	id: string;
	onSelect: (option: TSelectOption, id: string) => void;
	defaultValue?: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<TSelectOption | null>(
		() => {
			if (defaultValue) {
				const opt = options.find(opt => opt.id === defaultValue);
				if (opt) return opt;
			}

			return null;
		}
	);

	const handleOptionClick = (opt: TSelectOption) => {
		setSelectedOption(opt);
		onSelect(opt, id);
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
							{options.map(opt => (
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
