'use client';
import useAuthStore from '@/app/auth/_stores/useAuthStore';
import React from 'react';
import Toolbox from './Toolbox';
import { usePathname } from 'next/navigation';

export default function Wrapper() {
	const pathname = usePathname();
	const isValidated = useAuthStore(state => state.didValidate);
	const isVisible = isValidated && !pathname.includes('login');

	return (
		isVisible && (
			<div className="relative">
				<Toolbox />
			</div>
		)
	);
}
