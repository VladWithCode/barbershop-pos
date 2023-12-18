import CreateCustomerForm from '@/app/clientes/_components/CreateCustomerForm';
import React from 'react';
import { useFloatingWindowStore } from '../../_FloatingWindows/stores/useFloatingWindowStore';
import { motion } from 'framer-motion';

export default function NewCustomerWindow() {
	const windowContext = useFloatingWindowStore(state => state.windowContext);

	return (
		<motion.div
			className="relative w-[30rem] m-auto z-10"
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
			<CreateCustomerForm
				className="max-w-none w-full"
				onSuccess={windowContext?.onSuccess}
			/>
		</motion.div>
	);
}
