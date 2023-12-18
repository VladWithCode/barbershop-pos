export type CreditStatus = 'paid' | 'pending' | 'overdue' | null;

// Types for CreditListing component
export type CreditListingFields = {
	credits: ListingCredit[];
	search: string;
	filters: {
		isOverdue: Boolean | null;
		overdueInstallmentCount: number | null;
		activeCreditPaidAmount: number | null;
		activeCreditPendingAmount: number | null;
		activeCreditTotalAmount: number | null;
		creditStatus: CreditStatus;
		creditScoreLabel: CreditScoreLabel | null;
	};
	creditsPerPage: number;
	page: number;
};
export type CreditListingFilters = CreditListingFields['filters'];
export type ListingCredit = {
	_id: string;
	customerName: string;
	creditScore: number;
	creditScoreLabel: 'buena' | 'regular' | 'mala';
	isOverdue: boolean;
	overdueBy: number;
	activeCreditPendingAmount: number;
	activeCreditPaidAmount: number;
	activeCreditInterestAccumulated: number;
	activeCreditProductCount: number;
	activeCreditPurchases: number;
	totalProductsPurchased: number;
	totalCreditPurchases: number;
};
export type CreditScoreLabel = ListingCredit['creditScoreLabel'];
