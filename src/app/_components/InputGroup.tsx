'use client';
import React, {
	ChangeEventHandler,
	HTMLInputTypeAttribute,
	useEffect,
} from 'react';
import { getClassName } from '../_utils/helpers';
import Image from 'next/image';

function InputGroup({
	label,
	name,
	type,
	value,
	onChange,
	className,
	...props
}: {
	label: string;
	name: string;
	value?: string | number;
	type?: HTMLInputTypeAttribute;
	onChange?: ChangeEventHandler<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className="flex flex-col gap-y-1">
			<label htmlFor={name} className="font-medium text-current">
				{label}
			</label>
			<input
				type={type || 'text'}
				name={name}
				id={name}
				className={getClassName(
					'max-w-full bg-transparent py-1 border-2 border-transparent border-b-zinc-950 focus:rounded focus:ring-0 focus:border-zinc-50 focus:bg-zinc-800 focus:text-zinc-50',
					className
				)}
				value={value}
				onChange={onChange}
				{...props}
			/>
		</div>
	);
}

export default InputGroup;

export function TextArea({
	label,
	name,
	type,
	value,
	onChange,
	className,
	...props
}: {
	label: string;
	name: string;
	value?: string | number;
	type?: HTMLInputTypeAttribute;
	onChange?: ChangeEventHandler<HTMLTextAreaElement>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return (
		<div className="flex flex-col gap-y-1">
			<label htmlFor={name} className="text-sm font-medium">
				{label}
			</label>
			<textarea
				name={name}
				id={name}
				className={getClassName(
					'bg-transparent border-2 border-transparent border-b-current focus:outline-none focus:ring-0 focus:border-zinc-50 focus:bg-zinc-800 focus:text-zinc-50 focus:rounded-sm transition duration-75',
					className
				)}
				value={value}
				onChange={onChange}
				{...props}
			/>
		</div>
	);
}

export function FileInput({
	label,
	name,
	type,
	value,
	onChange,
	className,
	clearInput,
	setClearInput,
	...props
}: {
	label: string;
	name: string;
	type?: HTMLInputTypeAttribute;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	clearInput?: boolean;
	setClearInput?: React.Dispatch<React.SetStateAction<boolean>>;
} & React.TextareaHTMLAttributes<HTMLInputElement>) {
	const [isDragginOver, setIsDragginOver] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (clearInput && inputRef.current) {
			inputRef.current.value = '';
			if (typeof setClearInput === 'function') setClearInput(false);
		}
	}, [clearInput]);

	return (
		<label
			htmlFor={name}
			className={getClassName(
				'flex justify-center items-center h-32 border-2 border-dashed border-current text-xs text-center font-medium px-4 rounded-sm',
				isDragginOver && 'border-barber-red',
				className
			)}
			onDragOver={e => e.preventDefault()}
			onDragEnter={() => setIsDragginOver(true)}
			onDragLeave={() => setIsDragginOver(false)}
			onDrop={e => {
				e.preventDefault();

				if (inputRef.current) {
					inputRef.current.files = e.dataTransfer.files;
					inputRef.current.dispatchEvent(
						new Event('change', { bubbles: true })
					);
				}
			}}>
			{label}
			<input
				type="file"
				accept="image/*"
				multiple={false}
				name={name}
				id={name}
				className="w-0 h-0 invisible"
				onChange={onChange}
				ref={inputRef}
				{...props}
			/>
		</label>
	);
}

export function ImageInput({
	label,
	name,
	type,
	className,
	onChange,
	val,
	...props
}: {
	label: string;
	name: string;
	val?: File | null;
	type?: HTMLInputTypeAttribute;
	onChange?: ChangeEventHandler<HTMLInputElement>;
} & React.TextareaHTMLAttributes<HTMLInputElement>) {
	const [img, setImg] = React.useState<File | null>(null);
	const [shouldClearInput, setShouldClearInput] = React.useState(false);
	const _onChange = React.useCallback<ChangeEventHandler<HTMLInputElement>>(
		e => {
			e.preventDefault();
			const file = e.target.files?.[0];

			if (file) {
				setImg(file);
			}

			if (typeof onChange === 'function') onChange(e);
		},
		[]
	);

	useEffect(() => {
		if (!val) {
			setShouldClearInput(true);
			setImg(null);
		}
	}, [val]);

	return (
		<div className="flex gap-x-2 h-32">
			<FileInput
				label={label}
				name={name}
				type={type}
				onChange={_onChange}
				className={className}
				clearInput={shouldClearInput}
				setClearInput={setShouldClearInput}
				{...props}
			/>
			<div className="relative w-1/2 h-full flex">
				{img ? (
					<Image
						layout="fill"
						// width={128}
						// height={128}
						src={URL.createObjectURL(img)}
						alt="product-pic"
						onClick={e => {
							e.preventDefault();

							const deleteConfirmed = confirm(
								'¿Desea eliminar la imagen?'
							);

							if (deleteConfirmed) {
								setImg(null);
								setShouldClearInput(true);
							}
						}}></Image>
				) : (
					<svg className="w-24 h-24 m-auto fill-current">
						<use href="/sprites.svg#cologne"></use>
					</svg>
				)}
			</div>
		</div>
	);
}
