'use client';
import React, { useState } from 'react';
import InputGroup from '../_components/InputGroup';
import * as AuthService from '../auth/auth.service';
import Cookies from 'js-cookie';
import useAuthStore, { TUserRoles } from '../auth/_stores/useAuthStore';
import { useRouter } from 'next/navigation';
import AxiosInstance from '../_utils/api';
import { AnimatePresence, motion } from 'framer-motion';

function Login() {
	const router = useRouter();
	const [loginError, setLoginError] = useState('');
	const setToken = useAuthStore(state => state.setToken);
	const setUser = useAuthStore(state => state.setUser);
	const { mutateAsync } = AuthService.useLogin();

	const onLoginError = (e: any) => {
		const message = e?.response?.data?.message || 'Error al iniciar sesión';
		setLoginError(message);
	};
	const onLoginSuccess = (userData: {
		access_token: string;
		user: { name: string; role: TUserRoles };
	}) => {
		setUser(userData.user);
		setToken(userData.access_token);
		Cookies.set('access_token', userData.access_token, {
			expires: 1,
		});
		AxiosInstance.defaults.headers.common[
			'Authorization'
		] = `Bearer ${userData.access_token}`;

		router.replace('/');
	};
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className="w-full h-page overflow-y-auto overflow-x-hidden">
			<h1 className="font-light text-xl mt-6 mb-2 px-4">Inicia Sesión</h1>
			<form
				className="w-fit max-w-[95%] py-6 px-8 mx-auto mt-8 bg-zinc-300 space-y-4 rounded-md text-zinc-950"
				onSubmit={async e => {
					e.preventDefault();

					try {
						await mutateAsync(
							{
								username,
								password,
							},
							{
								onSuccess: onLoginSuccess,
								onError: onLoginError,
							}
						);
					} catch (e) {}
				}}>
				<InputGroup
					label="Nombre de Usuario"
					name="username"
					onChange={({ target }) => setUsername(target.value)}
				/>
				<InputGroup
					label="Contraseña"
					name="password"
					type="password"
					onChange={({ target }) => setPassword(target.value)}
				/>

				<AnimatePresence>
					{loginError?.length > 0 && (
						<motion.p
							className="text-red-500 font-medium"
							initial={{ maxHeight: '0%' }}
							animate={{ maxHeight: '100vh' }}>
							{loginError || 'Error al iniciar sesión'}
						</motion.p>
					)}
				</AnimatePresence>

				<button
					type="submit"
					className="block ml-auto bg-zinc-800 text-zinc-50 px-4 py-2 rounded-sm hover:bg-zinc-700">
					Iniciar Sesión
				</button>
			</form>
		</div>
	);
}

export default Login;
