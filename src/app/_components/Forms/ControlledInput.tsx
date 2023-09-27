import { getClassName } from '@/app/_utils/helpers';
import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

export type ControlledInputProps = {
	name: string;
	value: string;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	type?: HTMLInputTypeAttribute;
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function ControlledInput({
	name,
	value,
	onChange,
	type = 'text',
	className,
	...props
}: ControlledInputProps) {
	return (
		<input
			className={getClassName(
				'bg-transparent border-2 border-transparent border-b-zinc-400 focus:ring-0 focus:outline-none focus:border-zinc-100 focus:rounded focus:bg-zinc-800 focus:text-zinc-50',
				className
			)}
			type={type}
			name={name}
			id={name}
			onChange={onChange}
			value={value}
			{...props}
		/>
	);
}

export type LabelledControlledInputProps = ControlledInputProps & {
	label: string;
};

export function LabelledControlledInput({
	label,
	...props
}: LabelledControlledInputProps) {
	return (
		<div className="flex flex-col gap-y-2">
			<label htmlFor="name" className="text-xs font-medium uppercase">
				{label}
			</label>
			<ControlledInput {...props} />
		</div>
	);
}
