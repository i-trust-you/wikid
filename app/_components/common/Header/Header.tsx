"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import ExpandedMenu from "@/_components/common/Header/ExpandedMenu";

import Logo from "../../../../public/icons/Logo";
import MenuIcon from "../../../../public/icons/MenuIcon";

interface HeaderProps {
	loggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ loggedIn }) => {
	const [isMenuExpanded, setIsMenuExpanded] = useState(false);
	const [user, setUser] = useState();

	/** 스타일 */
	// inline-style에 추가하는 shadow 요소
	const customShadowStyle = {
		boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
	};

	/** 반응형 메뉴 */
	// 삼발이 클릭 시 확장메뉴 제어
	const handleExpandedMenu = () => {
		setIsMenuExpanded((prevState) => !prevState);
	};

	// window resize 감지 -> tablet 혹은 desktop 상태일 시 확장메뉴 숨김
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsMenuExpanded(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// 메뉴 요소
	const menuItems: {
		name: string;
		href: string;
	}[] = [
		{ name: "위키목록", href: "/" },
		{ name: "자유게시판", href: "/" },
		{ name: "알림", href: "/" },
		{ name: "마이페이지", href: "/" },
	];

	return (
		<header className="h-[60px] w-screen p-[15px_20px] desktop:h-[80px] desktop:p-[25px_80px]" style={customShadowStyle}>
			<ul className="flex items-center gap-[40px]">
				<li className="flex gap-[6px]">
					<Link href="">
						<Logo width="107" height="30" />
					</Link>
				</li>
				<li className="hidden tablet:block">
					<Link href="/">위키 목록</Link>
				</li>
				<li className="hidden tablet:block">
					<Link href="/">자유게시판</Link>
				</li>
				{!loggedIn ? (
					<li className="ml-auto">
						<Link href="/">로그인</Link>
					</li>
				) : (
					<>
						<li className="ml-auto hidden items-center gap-[24px] tablet:flex">
							<Image src="/public/icons/alarm.svg" alt="알림" width={32} height={32} />
							<Image src="/public/icons/profile.svg" alt="프로필" width={32} height={32} />
						</li>
						<li onClick={handleExpandedMenu} className="ml-auto inline-block cursor-pointer tablet:hidden">
							<MenuIcon width="24" height="24" />
						</li>
					</>
				)}
			</ul>
			{isMenuExpanded && window.innerWidth < 768 && <ExpandedMenu classNames="absolute top-[50px] right-[20px]" styles={customShadowStyle} items={menuItems} />}
		</header>
	);
};

export default Header;
