import { useRef, useEffect, useCallback } from 'react';

export default function useTimeout<T>(cb: () => T, delay: number) {
	const cbRef = useRef(cb);
	const timerRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		cbRef.current = cb;
	}, [cb]);

	const set = useCallback(() => {
		timerRef.current = setTimeout(() => cbRef.current(), delay);
	}, [delay]);

	const clear = useCallback(() => {
		timerRef.current && clearTimeout(timerRef.current);
	}, []);

	useEffect(() => {
		set();
		return clear;
	}, [delay, set, clear]);

	const reset = useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	return { reset, clear };
}
