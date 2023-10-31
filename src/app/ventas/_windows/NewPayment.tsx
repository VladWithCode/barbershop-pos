'use client';
import { motion } from 'framer-motion';
import React, { SetStateAction, useCallback } from 'react';
import CustomerPicker from '../../clientes/_components/CustomerPicker';
import { useNewPaymentStore } from '../_stores/useNewPaymentStore';
import { CustomerDoc } from '@/app/clientes/_services/CustomerService';
import { CreatePaymentWindow } from '../_components/CreatePayment';

type SequenceComponent = {
	context?: Record<string, any> & {
		setSequenceStep: React.Dispatch<SetStateAction<number>>;
	};
};

/*
 * Define the order of components this window will display
 */
const ComponentSequence: [
	typeof CustomerPicker & SequenceComponent,
	typeof CreatePaymentWindow & SequenceComponent
] = [CustomerPicker, CreatePaymentWindow];

export default function NewPayment() {
	const { credit, sequenceStep, setSequenceStep, setCreditData } =
		useNewPaymentStore();
	const CurrentComponent = ComponentSequence[sequenceStep];

	const onCustomerSelection = useCallback((selectedCustomer: CustomerDoc) => {
		setCreditData({
			_id: selectedCustomer._id,
			customer: selectedCustomer.fullname,
			purchase: selectedCustomer.sales,
		});

		setSequenceStep(sequenceStep + 1);
	}, []);

	return (
		<motion.div
			className="flex flex-col gap-y-2 relative m-auto z-10 w-5/6 h-4/5 bg-zinc-300 rounded p-2"
			initial={{
				y: '-100%',
				opacity: 0,
			}}
			animate={{
				y: '0%',
				opacity: 1,
			}}
			exit={{
				y: '100%',
				opacity: 0,
			}}>
			<div className="h-12 w-full px-4 py-1 grow-0 flex justify-between">
				<button
					className="p-2 text-sm uppercase bg-zinc-800 rounded"
					onClick={() =>
						sequenceStep > 0
							? setSequenceStep(sequenceStep - 1)
							: void 0
					}>
					Atras
				</button>
			</div>
			{CurrentComponent ? (
				<CurrentComponent
					context={{
						setSequenceStep,
						onSelection: onCustomerSelection,
						creditData: credit,
					}}
					className="flex-auto"
				/>
			) : (
				<div className="m-auto">
					<p className="text-lg text-zinc-500">
						Ups... Ocurrio un error
					</p>
				</div>
			)}
			{/* footer */}
			<div className="h-12 w-full px-4 py-4 grow-0 flex"></div>
		</motion.div>
	);
}
