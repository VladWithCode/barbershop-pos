import React from 'react';
import ControlBtn from './ControlBtn';

function ControlWrapper() {
	return (
		<div className="flex flex-grow-0 w-full h-8 mb-8">
			<ControlBtn type="filter" />
			<div className="border-l-2 border-zinc-400"></div>
			<ControlBtn type="search" />
		</div>
	);
}

export default ControlWrapper;
