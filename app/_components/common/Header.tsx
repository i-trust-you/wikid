"use client";

import Image from "next/image";
import Link from "next/link";

import useLocalStorage from "@/_hooks/useLocalStorage";

export default function Header() {
	const [accessToken, setAccessToken] = useLocalStorage<string | null>("accessToken", null);

	return (
		<header className="flex h-[60px] justify-between bg-white px-[20px] text-md font-normal shadow-[0px_4px_20px_0px_#0000000D] desktop:px-[80px]">
			<div className="flex items-center gap-[40px] text-gray-500">
				<Link href="/">
					<Image src="/icons/logo.svg" alt="logo" width={105} height={30} />
				</Link>
				<Link href="/wikilist" className="tablet:visible">
					위키 목록
				</Link>
				<Link href="/boards" className="tablet:visible">
					자유게시판
				</Link>
			</div>
			<div className="flex items-center gap-[24px]">
				{accessToken ? (
					<>
						<Image src="/icons/alarm.svg" alt="logo" width={32} height={32} />
						<Image src="/icons/profile.svg" alt="logo" width={32} height={32} />
					</>
				) : (
					<Link href="/login" className="text-gray-400">
						로그인
					</Link>
				)}
			</div>
		</header>
	);
}
