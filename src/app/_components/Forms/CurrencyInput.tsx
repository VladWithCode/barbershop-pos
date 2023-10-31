import { getClassName, numberToPrice } from '@/app/_utils/helpers';
import React from 'react';

export default function CurrencyInput({
	name,
	className,
	type,
	onChange,
	value = 0,
}: {
	name: string;
	className?: string;
	type?: string;
	onChange?: (value: number, id: string) => void;
	value?: number;
}) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = Number.isNaN(+e.target.value) ? 0 : +e.target.value;

		if (typeof onChange === 'function') onChange(v, name);
	};

	return (
		<input
			name={name}
			id={name}
			className={getClassName(
				'max-w-full bg-transparent py-1 border-2 border-transparent border-b-zinc-950 focus:rounded focus:ring-0 focus:border-zinc-50 focus:bg-zinc-800 focus:text-zinc-50',
				className
			)}
			type={type || 'text'}
			onChange={handleChange}
			value={value}
		/>
	);
}
