import { createWithEqualityFn as create } from 'zustand/traditional';

const INITIAL_AUTH_STATE = {
	user: {
		name: '',
		role: '',
	},
	token: '',
};

const useAuthStore = create<TAuthStore>(
	set => ({
		...INITIAL_AUTH_STATE,

		setToken: token => set(() => ({ token })),
		setUser: user => set(() => ({ user })),
		setUserField: (field, value) =>
			set(state => ({ user: { ...state.user, [field]: value } })),
	}),
	Object.is
);

export default useAuthStore;

export type TUser = {
	name: string;
	role: TUserRoles;
};

export type TUserRoles = 'admin' | 'user';

export type TAuthFields = typeof INITIAL_AUTH_STATE;

export type TAuthStore = TAuthFields & {
	setToken: (token: string) => void;
	setUser: (user: TUser) => void;
	setUserField: (field: string, value: string | number) => void;
};
