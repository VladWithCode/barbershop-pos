import { useEffect } from 'react';
import useAuthStore, { TUser } from '../_stores/useAuthStore';
import Cookies from 'js-cookie';
import { logout, validateLogin } from '../auth.service';

export default function useAuth() {
	const { user, token, didValidate, isValidating } = useAuthStore(
		state => ({
			user: state.user,
			token: state.token,
			didValidate: state.didValidate,
			isValidating: state.isValidating,
		}),
		Object.is
	);
	const setDidValidate = useAuthStore(state => state.setDidValidate);
	const setToken = useAuthStore(state => state.setToken);
	const setUser = useAuthStore(state => state.setUser);
	const setIsValidating = useAuthStore(state => state.setIsValidating);

	useEffect(() => {
		if (didValidate || isValidating) return;

		const _token = token || Cookies.get('access_token');

		setIsValidating(true);

		validateLogin(_token)
			.then((user: TUser) => {
				setToken(_token as string);
				setUser(user);
				setDidValidate(true);
			})
			.catch(e => {
				console.error(e);
				Cookies.remove('access_token');
				setToken('');
				setUser({ name: '', role: 'user' });
				setDidValidate(false);
			})
			.finally(() => setIsValidating(false));
	}, []);

	const _logout = () => {
		logout();
		setToken('');
		setUser({ name: '', role: 'user' });
		setDidValidate(false);
	};

	return { user, didValidate, isValidating, logout: _logout };
}
