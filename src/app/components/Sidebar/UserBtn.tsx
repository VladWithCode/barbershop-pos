import React from 'react';

function UserBtn({
	setUserMenuActive,
}: {
	setUserMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<button
			className="my-auto mr-4"
			onClick={() => setUserMenuActive(prev => !prev)}>
			<svg className="w-8 h-8 fill-zinc-50">
				<use href="/sprites.svg#user"></use>
			</svg>
		</button>
	);
}

export default UserBtn;
