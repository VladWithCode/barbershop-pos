import { createWithEqualityFn } from 'zustand/traditional';
import { CreditListingFields, CreditScoreLabel, ListingCredit } from '../types';

const INITIAL_CREDIT_LISTING_STATE: CreditListingFields = {
	credits: [],
	search: '',
	filters: {
		isOverdue: null,
		overdueInstallmentCount: null,
		activeCreditPaidAmount: null,
		activeCreditPendingAmount: null,
		activeCreditTotalAmount: null,
		creditStatus: null,
		creditScoreLabel: null,
	},
	creditsPerPage: 25,
	page: 0,
};

const useCreditListingStore = createWithEqualityFn<CreditListingStore>(
	(set, get) => ({
		...INITIAL_CREDIT_LISTING_STATE,

		setCredits: credits => set({ credits }),
		setSearch: search => set({ search }),
		resetSearch: () => set({ search: '' }),
		setFilter: (filter, value) => set({ [filter]: value }),
		resetFilters: () =>
			set({ filters: INITIAL_CREDIT_LISTING_STATE.filters }),
		setCreditsPerPage: creditNumber =>
			set({ creditsPerPage: creditNumber }),
		setPage: page => set({ page }),
	}),
	Object.is
);

export default useCreditListingStore;

export type CreditListingStore = CreditListingFields & {
	setCredits: (credits: ListingCredit[]) => void;
	setSearch: (search: string) => void;
	setFilter: <
		F extends keyof CreditListingFields['filters'],
		V extends CreditListingFields['filters'][F]
	>(
		filter: F,
		value: V
	) => void;
	setCreditsPerPage: (creditNumber: number) => void;
	setPage: (p: number) => void;
};
