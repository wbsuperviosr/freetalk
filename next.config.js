/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "source.unsplash.com",
			},
		],
	},
	i18n: {
		locales: ["zh-CN"],
		defaultLocale: "zh-CN",
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	reactStrictMode: true,
	plugins: [],
};
