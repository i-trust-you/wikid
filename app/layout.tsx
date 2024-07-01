import Header from "@/_components/common/Header";

import "./globals.css";

export default function Layout({ children }: Readonly<React.PropsWithChildren>) {
	return (
		<html lang="ko">
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}

/** @type {import("next").Metadata} */
export const metadata = { title: "Wikid", description: "다른 사람들의 위키를 작성하고 공유하세요." };
