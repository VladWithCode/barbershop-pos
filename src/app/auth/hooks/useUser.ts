import { useEffect, useState } from 'react';
import useAuthStore from '../stores/useAuthStore';
import Cookies from 'js-cookie';

export default function useUser() {
	const { user, token } = useAuthStore(
		state => ({ user: state.user, token: state.token }),
		Object.is
	);
	const setToken = useAuthStore(state => state.setToken);
	const setUser = useAuthStore(state => state.setUser);
}
