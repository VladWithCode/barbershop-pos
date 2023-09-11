import { useState, useEffect } from 'react';
import useTimeout from './useTimeout';

export default function useDebounce<T>(
	cb: () => T,
	delay: number,
	deps: any[]
) {
	const { reset, clear } = useTimeout(cb, delay);

	useEffect(reset, [...deps, reset]);
	useEffect(clear, []);
}
