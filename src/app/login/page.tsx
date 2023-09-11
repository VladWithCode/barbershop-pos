'use client';
import React, { useState } from 'react';
import InputGroup from '../components/InputGroup';
import * as AuthService from '../auth/auth.service';
import Cookies from 'js-cookie';
import globals from '../globals';

function Login() {
	const [loginError, setLoginError] = useState('');
	const { mutateAsync } = AuthService.useLogin();
	const onLoginError = (e: any) => {
		console.log(e);
		setLoginError(e.message);
	};
	const onLoginSuccess = (userData: {
		access_token: string;
		user: { name: string; role: string };
	}) => {};
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [users, setUsers] = useState<Record<string, any>[]>([]);

	return (
		<div className="w-full h-page overflow-y-auto overflow-x-hidden">
			<h1 className="font-light text-xl mt-6 mb-2 px-4">Inicia Sesión</h1>

			<div className="w-11/12 my-8 mx-auto">
				{loginError && (
					<p className="text-barber-red font-bold text-md">
						{loginError}
					</p>
				)}
			</div>

			<form
				className="w-fit max-w-[95%] py-6 px-8 mx-auto mt-8 bg-barber-red shadow-sm shadow-rose-800 space-y-4 rounded-md"
				onSubmit={async e => {
					e.preventDefault();

					const response = await mutateAsync({
						username,
						password,
					});

					console.log(response);
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

				<button
					type="submit"
					className="w-full py-2 text-white bg-barber-red hover:bg-barber-red">
					Iniciar Sesión
				</button>
			</form>
		</div>
	);
}

export default Login;
