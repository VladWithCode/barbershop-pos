'use client';
import React from 'react';
import { useCreditListing } from '../../_hooks/useCreditListing';
import useCreditListingStore from '../../_stores/useCreditListingStore';
import { getClassName, numberToPrice } from '@/app/_utils/helpers';
import Loading from '@/app/_components/Loading/Loading';

export default function Listing({ className }: { className?: string }) {
	const { page, search, filters } = useCreditListingStore(state => ({
		page: state.page,
		search: state.search,
		filters: state.filters,
	}));
	const { data, isLoading, isError, error } = useCreditListing({
		search,
		page,
		filters,
	});

	return (
		<div
			className={getClassName(
				'space-y-2 p-1 bg-zinc-300 rounded overflow-hidden overflow-y-auto custom-scroll-bar',
				className
			)}>
			{isLoading && <Loading />}
			{isError && (
				<div className="h-full flex flex-col justify-center items-center">
					<p className="text-9xl text-zinc-400">&times;</p>
					<p className="text-xl text-zinc-500">
						{(error as any).message}
					</p>
				</div>
			)}
			<div className="grid grid-cols-10 bg-rose-950 px-2 p-1 rounded gap-x-3 font-medium">
				<div className="col-span-1 text-xs font-medium my-auto">#</div>
				<div className="col-span-3 my-auto">Nombre</div>
				<div className="col-span-2 my-auto text-center">
					Saldo Pendiente
				</div>
				<div className="col-span-2 my-auto text-center">
					Puntiacion Crediticia
				</div>
				<div className="col-span-2 my-auto text-center">
					Retraso en pagos
				</div>
			</div>
			{data?.map(c => (
				<button
					className="grid grid-cols-10 w-full bg-zinc-800 p-1 px-2 rounded gap-x-3 hover:bg-zinc-950"
					key={c._id}>
					<p className="col-span-1 text-lg my-auto font-light">
						{c.activeCreditPurchases}
					</p>
					<div className="col-span-3 my-auto text-start">
						<p className="truncate font-medium">{c.customerName}</p>
					</div>
					<div className="col-span-2 my-auto text-center">
						<p className="font-medium">
							{numberToPrice(c.activeCreditPendingAmount / 100)}
						</p>
					</div>
					<div className="col-span-2 m-auto text-center font-light">
						<p className="capitalize">{c.creditScoreLabel}</p>
						<p className="text-sm text-zinc-500">
							({c.creditScore})
						</p>
					</div>
					<div className="col-span-2 my-auto text-center font-light">
						{c.isOverdue
							? c.overdueBy + ' quincenas'
							: 'Al corriente'}
					</div>
				</button>
			))}
		</div>
	);
}
