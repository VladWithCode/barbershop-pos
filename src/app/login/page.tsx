'use client';
import React, { useState } from 'react';
import InputGroup from '../_components/InputGroup';
import * as AuthService from '../auth/auth.service';
import Cookies from 'js-cookie';
import useAuthStore, { TUserRoles } from '../auth/_stores/useAuthStore';
import { useRouter } from 'next/navigation';
import AxiosInstance from '../_utils/api';
import { AnimatePresence, motion } from 'framer-motion';
import Page from '../_components/Page';
import { getClassName } from '../_utils/helpers';
import Spinner from '../_components/Loading/Spinner';
import useForm from '../_hooks/useForm';
import useTimeout from '../_hooks/useTimeout';
import { useToast } from '../_components/Toast/Toast';
import Loading from '../_components/Loading/Loading';

function Login() {
	const router = useRouter();
	const [loginError, setLoginError] = useState('');
	const [loginSuccess, setLoginSuccess] = useState(false);
	const setToken = useAuthStore(state => state.setToken);
	const setUser = useAuthStore(state => state.setUser);
	const setDidValidate = useAuthStore(state => state.setDidValidate);
	const { mutateAsync, isLoading } = AuthService.useLogin();
	const { pushToast } = useToast();

	const onLoginError = (e: any) => {
		const message = e?.response?.data?.message || 'Error al iniciar sesión';
		setLoginError(message);
		pushToast({ type: 'error', message: 'Error al iniciar sesión.' });
	};
	const onLoginSuccess = (userData: {
		access_token: string;
		user: { name: string; role: TUserRoles };
	}) => {
		pushToast({ message: 'Inicio de sesion exitoso', type: 'success' });
		setUser(userData.user);
		setToken(userData.access_token);
		setDidValidate(true);
		Cookies.set('access_token', userData.access_token, {
			expires: 1 / 4, // 6 hours (1 day = 1, 1/4 day = 6 hours)
		});
		AxiosInstance.defaults.headers.common[
			'Authorization'
		] = `Bearer ${userData.access_token}`;
		setLoginSuccess(true);

		router.replace('/');
	};
	const [{ username, password }, onChange] = useForm({
		username: '',
		password: '',
	});

	return (
		<Page>
			<div className="relative col-span-full flex flex-col py-2">
				<h1 className="font-light text-xl mt-32">Inicia Sesión</h1>
				<div className="py-2" />
				{isLoading || loginSuccess ? (
					<div className="m-auto mt-48">
						<Loading />
					</div>
				) : (
					<form
						className="w-fit py-6 px-8 mb-auto bg-zinc-300 space-y-4 rounded text-zinc-950"
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
							onChange={onChange}
						/>
						<InputGroup
							label="Contraseña"
							name="password"
							type="password"
							onChange={onChange}
						/>

						<ErrorDisplay
							message={loginError}
							onReset={() => setLoginError('')}
						/>

						<button
							type="submit"
							className={getClassName(
								'block ml-auto bg-zinc-800 text-zinc-50 px-4 py-2 rounded-sm hover:bg-zinc-700',
								isLoading ? 'brightness-90' : ''
							)}
							disabled={isLoading}>
							{isLoading ? (
								<Spinner width={6} borderWidth={2} />
							) : (
								'Iniciar sesión'
							)}
						</button>
					</form>
				)}
			</div>
		</Page>
	);
}

export default Login;

function ErrorDisplay({
	message,
	onReset,
}: {
	message: string;
	onReset: () => void;
}) {
	useTimeout(onReset, 3500);

	return (
		<AnimatePresence>
			{message?.length > 0 && (
				<motion.p
					className="text-red-500 font-medium"
					initial={{ maxHeight: '0%' }}
					animate={{ maxHeight: '100vh' }}>
					{message || 'Error al iniciar sesión'}
				</motion.p>
			)}
		</AnimatePresence>
	);
}
