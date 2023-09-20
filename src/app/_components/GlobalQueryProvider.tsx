'use client';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuth from '../auth/_hooks/useAuth';
import AxiosInstance from '../_utils/api';

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function GlobalQueryProvider({ children }: React.PropsWithChildren) {
	const { token } = useAuth();

	useEffect(() => {
		if (token && token.length > 0) {
			AxiosInstance.defaults.headers.common[
				'Authorization'
			] = `Bearer ${token}`;
		}
	}, [token]);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}

export default GlobalQueryProvider;
