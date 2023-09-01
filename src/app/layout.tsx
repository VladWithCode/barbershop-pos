import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Sidebar from './components/Sidebar/Sidebar';

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
				<div className="relative lg:flex flex-wrap lg:h-full z-0">
					<Sidebar />
					{children}
				</div>
			</body>
		</html>
	);
}
