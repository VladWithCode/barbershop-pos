'use client';
import React, { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

function InputGroup({
	label,
	name,
	type,
	value,
	onChange,
}: {
	label: string;
	name: string;
	value?: string | number;
	type?: HTMLInputTypeAttribute;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
	return (
		<div className="flex flex-col gap-y-2">
			<label htmlFor="name" className="text-xs font-bold">
				{label}
			</label>
			<input
				type={type || 'text'}
				name={name}
				id={name}
				className="px-3 py-1 text-zinc-900 text-md rounded shadow-inner shadow-zinc-400"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}

export default InputGroup;
