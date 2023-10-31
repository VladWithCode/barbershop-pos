import { useCallback } from 'react';
import { useImmerReducer } from 'use-immer';

export type NewPaymentCredit = {
	_id: string;
	customer: string;
	purchase: string[];
};

export type NewPaymentData = {
	amount: number;
	paymentDate: Date;
	interest: number;
};

export const NewPaymentStore: {
	sequenceStep: number;
	credit: NewPaymentCredit;
	payment: NewPaymentData;
} = {
	sequenceStep: 0,
	credit: {
		_id: '',
		customer: '',
		purchase: [],
	},
	payment: {
		amount: 0,
		paymentDate: new Date(),
		interest: 0,
	},
};

export const useNewPaymentStore = () => {
	const [store, dispatch] = useImmerReducer(reducer, NewPaymentStore);

	const setSequenceStep = useCallback(
		(sequenceStep: number) =>
			dispatch({
				type: NewPaymentStoreActions.SetSequenceStep,
				payload: sequenceStep,
			}),
		[]
	);

	const setCreditData = useCallback(
		(creditData: Partial<NewPaymentCredit>) => {
			dispatch({
				type: NewPaymentStoreActions.SetCreditData,
				payload: creditData,
			});
		},
		[]
	);

	const setCreditField = useCallback(
		(
			field: keyof NewPaymentCredit,
			data: NewPaymentCredit[keyof NewPaymentCredit]
		) => {
			dispatch({
				type: NewPaymentStoreActions.SetCreditField,
				payload: { field, data },
			});
		},
		[]
	);

	const setPaymentData = useCallback((paymentData: NewPaymentData) => {
		dispatch({
			type: NewPaymentStoreActions.SetPaymentData,
			payload: paymentData,
		});
	}, []);

	const setPaymentField = useCallback(
		(
			field: keyof NewPaymentData,
			data: NewPaymentData[keyof NewPaymentData]
		) => {
			dispatch({
				type: NewPaymentStoreActions.SetPaymentField,
				payload: {
					field,
					data,
				},
			});
		},
		[]
	);

	const reset = useCallback(
		() =>
			dispatch({
				type: NewPaymentStoreActions.Reset,
				payload: undefined,
			}),
		[]
	);

	return {
		...store,
		setSequenceStep,
		setCreditData,
		setCreditField,
		setPaymentData,
		setPaymentField,
		reset,
	};
};

export const NewPaymentStoreActions = {
	SetSequenceStep: 'setSequenceStep',
	SetCreditData: 'setCreditData',
	SetCreditField: 'setCreditField',
	SetPaymentData: 'setPaymentData',
	SetPaymentField: 'setPaymentField',
	Reset: 'reset',
} as const;

const reducer = (
	state: typeof NewPaymentStore,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	const actionFn = actions[type];

	if (!actionFn) throw new Error(`[${type}] is not a valid function`);

	return actionFn(state, payload);
};

const actions: Record<
	string,
	(state: typeof NewPaymentStore, payload: any) => void
> = {
	setSequenceStep: (state, payload) => {
		state.sequenceStep = payload;
	},
	setCreditData: (state, payload) => {
		state.credit = payload;
	},
	setCreditField: (state, payload) => {
		state.credit[payload.field as keyof NewPaymentCredit] = payload.data;
	},
	setPaymentData: (state, payload) => {
		state.payment = payload;
	},
	setPaymentField: (state, payload) => {
		state.payment[payload.field as keyof NewPaymentData] = payload.data;
	},
	reset: state => {
		state = NewPaymentStore;
	},
};
