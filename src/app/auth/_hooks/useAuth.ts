import { useEffect } from 'react';
import useAuthStore, { TUser } from '../_stores/useAuthStore';
import Cookies from 'js-cookie';
import { validateLogin } from '../auth.service';

export default function useAuth() {
	const { user, token, didValidate } = useAuthStore(
		state => ({
			user: state.user,
			token: state.token,
			didValidate: state.didValidate,
		}),
		Object.is
	);
	const setDidValidate = useAuthStore(state => state.setDidValidate);
	const setToken = useAuthStore(state => state.setToken);
	const setUser = useAuthStore(state => state.setUser);

	useEffect(() => {
		if (didValidate) return;

		const _token = token || Cookies.get('access_token');

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
			});
	}, []);

	return { ...user, token };
}
