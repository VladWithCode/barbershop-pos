import { getClassName } from '@/app/_utils/helpers';
import React, { useState } from 'react';

export default function InputWithDefault({
	name,
	className,
	type,
	onChange,
	value,
	defaultValue = '',
}: {
	name: string;
	className?: string;
	type?: string;
	onChange?: (value: string | number, id: string) => void;
	value?: string | number;
	defaultValue?: string | number;
}) {
	const [_value, setValue] = useState(value || defaultValue);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value;
		setValue(v);

		if (typeof onChange === 'function') onChange(v, name);
	};

	/* 
		If the new value is empty, set the default value
	 */
	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target.value === '') {
			setValue(defaultValue);
			if (typeof onChange === 'function') onChange(defaultValue, name);
		}
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
			onBlur={handleBlur}
			value={_value}
		/>
	);
}
