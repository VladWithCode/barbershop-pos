import React from 'react';

export default function ConfirmModal({
	message,
	onConfirm,
	onCancel,
}: {
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}) {
	return (
		<div
			id="CONFIRM_MODAL_COMPONENT"
			className="fixed inset-0 z-50 bg-zinc-900 bg-opacity-50 flex justify-center items-center text-zinc-950">
			<div className="bg-zinc-50 rounded p-4">
				<p className="text-center w-3/5 mx-auto">{message}</p>
				<div className="flex justify-center gap-x-2 mt-4">
					<button
						className="bg-zinc-800 text-zinc-50 px-4 py-2 rounded-sm hover:bg-zinc-700"
						onClick={onConfirm}>
						Sí
					</button>
					<button
						className="bg-zinc-800 text-zinc-50 px-4 py-2 rounded-sm hover:bg-zinc-700"
						onClick={onCancel}>
						No
					</button>
				</div>
			</div>
		</div>
	);
}
