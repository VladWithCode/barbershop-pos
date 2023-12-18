import React from 'react';
import Spinner from './Spinner';

function Loading() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-y-3">
			<Spinner className="border-8 w-24" />
			<p className="uppercase font-bold">Cargando...</p>
		</div>
	);
}

export default Loading;
