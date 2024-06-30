/* eslint-disable import/no-anonymous-default-export /
/** @type {import("next").NextConfig} */
export default {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};
