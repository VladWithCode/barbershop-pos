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
			<label htmlFor="name" className="text-sm font-medium">
				{label}
			</label>
			<input
				type={type || 'text'}
				name={name}
				id={name}
				className="bg-transparent border-0 border-b-2 border-barber-red focus:outline-none focus:ring-0 focus:shadow-transparent focus:border-zinc-50"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}

export default InputGroup;
