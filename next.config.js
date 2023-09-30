/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'localhost',
			'api.certx-mx.org',
			'192.168.1.2',
			'192.168.1.3',
		],
	},
};

module.exports = nextConfig;
