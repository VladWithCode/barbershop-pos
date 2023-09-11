'use client';

import { useRouter } from 'next/navigation';

export default function BackBtn() {
	const router = useRouter();

	return (
		<button onClick={() => router.back()} className="my-auto ml-4">
			<svg className="w-10 h-10 fill-zinc-50 -rotate-180">
				<use href="/sprites.svg#angle"></use>
			</svg>
		</button>
	);
}
