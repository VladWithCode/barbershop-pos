'use client';
import React from 'react';

function ControlBtn({ type }: { type: 'search' | 'filter' }) {
	return (
		<button className="flex-shrink-0 flex-grow h-full">
			<svg className="w-8 h-full mx-auto fill-zinc-50">
				<use href={'/sprites.svg#' + type}></use>
			</svg>
		</button>
	);
}

export default ControlBtn;
