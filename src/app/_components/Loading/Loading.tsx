import React from 'react';
import Spinner from './Spinner';

function Loading() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-y-3">
			<Spinner />
			<p className="text-zinc-50 uppercase font-bold">Cargando...</p>
		</div>
	);
}

export default Loading;
