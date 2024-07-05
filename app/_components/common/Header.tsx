"use client";

import Image from "next/image";
import Link from "next/link";

import useCookie from "@/_hooks/useCookie";

import Popover from "@/_components/general/Popover";

import MenuIcon from "../../../public/icons/MenuIcon";

export default function Header() {
	const [accessToken, setAccessToken] = useCookie<string>("accessToken");
	const [refreshoken, setRefreshToken] = useCookie<string>("refreshToken");

	return (
		<header className="flex h-[60px] justify-between bg-white px-[20px] text-md font-normal shadow-[0px_4px_20px_0px_#0000000D] desktop:px-[80px]">
			<div className="flex items-center gap-[40px] text-gray-500">
				<Link href="/">
					<Image src="/icons/logo.svg" alt="logo" width={105} height={30} />
				</Link>
				<Link href="/wikilist" className="hidden tablet:block">
					위키 목록
				</Link>
				<Link href="/boards" className="hidden tablet:block">
					자유게시판
				</Link>
			</div>
			<div className="flex items-center gap-[24px]">
				{accessToken ? (
					<>
						<Link href="/notifications" className="hidden tablet:block">
							<Image src="/icons/alarm.svg" alt="logo" width={32} height={32} />
						</Link>
						<Link href="/mypage" className="hidden tablet:block">
							<Image src="/icons/profile.svg" alt="logo" width={32} height={32} />
						</Link>
					</>
				) : (
					<Link href="/login" className="hidden text-gray-400 tablet:block">
						로그인
					</Link>
				)}
				<Popover
					gap={5}
					trigger="click"
					position="top-right-bottom-right"
					overlay={
						<div className="flex w-[120px] flex-col items-center overflow-hidden rounded-[10px] bg-white shadow-[0px_4px_8px_0px_#00000014]">
							<div className="flex h-[44px] w-full items-center justify-center hover:bg-gray-100">알림</div>
							<Link href="/wikilist">
								<div className="flex h-[44px] w-full items-center justify-center hover:bg-gray-100">위키목록</div>
							</Link>
							<Link href="/boards">
								<div className="flex h-[44px] w-full items-center justify-center hover:bg-gray-100">자유게시판</div>
							</Link>
							<Link href="/mypage">
								<div className="flex h-[44px] w-full items-center justify-center hover:bg-gray-100">마이페이지</div>
							</Link>
							<div className="flex h-[44px] w-full items-center justify-center hover:bg-gray-100" onClick={() => setAccessToken(null)}>
								로그아웃
							</div>
						</div>
					}
				>
					<div className="tablet:hidden">
						<MenuIcon width="24" height="24"></MenuIcon>
					</div>
				</Popover>
			</div>
		</header>
	);
}
