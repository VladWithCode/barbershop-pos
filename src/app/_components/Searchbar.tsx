import ControlledInput from '@/app/_components/Forms/ControlledInput';
import useDebounce from '@/app/_hooks/useDebounce';
import React, { useState } from 'react';

export type SearchbarProps = {
	onSearch: (query: string) => void;
	placeholder?: string;
};

export default function Searchbar({ onSearch, placeholder }: SearchbarProps) {
	const [searchValue, setSearchValue] = useState('');

	useDebounce(() => onSearch(searchValue), 700, [searchValue]);

	return (
		<div className="flex items-center h-10">
			<ControlledInput
				className="w-full peer h-full"
				name="search-custome"
				value={searchValue}
				onChange={e => setSearchValue(e.target.value)}
				placeholder={placeholder ?? 'Buscar...'}
			/>
			<div className="flex items-center justify-center h-full w-1/12 border-2 border-transparent -ml-1 peer-focus:bg-zinc-800 peer-focus:border-zinc-50 rounded-e cursor-pointer">
				<svg className="w-8 h-8 fill-current">
					<use href="/sprites.svg#search"></use>
				</svg>
			</div>
		</div>
	);
}
