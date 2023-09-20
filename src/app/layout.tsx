import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Sidebar from './_components/Sidebar/Sidebar';
import GlobalQueryProvider from './_components/GlobalQueryProvider';
import ToastWrapper from './_components/Toast/Toast';

const font = Poppins({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'The Boss | POS',
	description: 'Made with love ❤️',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<div className="relative h-full z-0">
					<GlobalQueryProvider>
						<Sidebar />
						{children}
						<ToastWrapper />
					</GlobalQueryProvider>
				</div>
			</body>
		</html>
	);
}
