import { useReducer } from 'react';

export default function useForm<T extends Record<string, any>>(
	initialState: T
): [T, (name: string, value: any) => void, () => void] {
	const [state, dispatch] = useReducer(
		(state: T, action: { type: string; payload: any }) => {
			switch (action.type) {
				case 'set':
					return { ...state, ...action.payload };
				case 'setField':
					return {
						...state,
						[action.payload.name]: action.payload.value,
					};
				case 'reset':
					return initialState;
				default:
					return state;
			}
		},
		initialState
	);

	const setField = (name: string, value: any) =>
		dispatch({ type: 'setField', payload: { name, value } });
	const reset = () => dispatch({ type: 'reset', payload: null });

	return [state, setField, reset];
}
