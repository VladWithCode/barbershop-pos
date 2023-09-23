'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="relative w-full h-page p-4 gap-y-4">
			<div className="h-full w-full flex flex-col items-center justify-center gap-y-4">
				<h1 className="text-4xl font-medium">
					Upss! Parece que el lugar al que intentaste acceder no
					existe
				</h1>
				<p className="text-zinc-300">
					Puedes{' '}
					<Link
						className="text-sky-500"
						href="#"
						onClick={e => {
							e.preventDefault();
							router.push('/');
						}}>
						volver al inicio{' '}
					</Link>{' '}
					o{' '}
					<Link
						className="text-sky-500"
						href="#"
						onClick={e => {
							e.preventDefault();
							router.back();
						}}>
						volver atrás
					</Link>
					.
				</p>
			</div>
		</div>
	);
}
