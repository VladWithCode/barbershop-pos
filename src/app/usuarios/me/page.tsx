'use client';
import useAuth from '@/app/auth/_hooks/useAuth';
import React from 'react';
import { useUser } from '../_services/user.service';
import Loading from '@/app/_components/Loading/Loading';
import Page from '@/app/_components/Page';

export default function User() {
	const {
		user: { name },
	} = useAuth();
	const { data, isLoading, isError } = useUser(name);

	return (
		<Page>
			<h1 className="text-lg px-8 pt-2 pb-8">Mi Perfil</h1>
			<div className="w-4/5 mx-auto">
				<div className="flex flex-col bg-zinc-300 py-4 px-8 w-96 text-zinc-950 gap-y-3">
					{isError && (
						<p className="m-auto text-red-500">
							Error al cargar el usuario
						</p>
					)}
					{isLoading && <Loading />}

					{data && (
						<>
							<div className="w-full flex flex-col">
								<p className="font-medium">Nombre:</p>
								<p>{data.display_name}</p>
							</div>
							<div className="w-full flex flex-col">
								<p className="font-medium">Usuario:</p>
								<p>{data.username}</p>
							</div>
							<div className="w-full flex flex-col">
								<p className="font-medium">Rol:</p>
								<p>{data.role}</p>
							</div>
						</>
					)}
				</div>
			</div>
		</Page>
	);
}
