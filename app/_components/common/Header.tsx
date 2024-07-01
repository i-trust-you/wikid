"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Alarm from "../../../public/icons/Alarm";
import Logo from "../../../public/icons/Logo";
import MenuIcon from "../../../public/icons/MenuIcon";
import Profile from "../../../public/icons/Profile";

interface HeaderProps {
	loggedIn: boolean;
	alarm: number;
}
interface Item {
	name: string;
	href: string;
}

interface ItemListProps {
	items: Item[];
	styles?: { boxShadow: string };
	classNames?: string;
}

const ExpandedMenu: React.FC<ItemListProps> = ({ items, styles, classNames }) => {
	return (
		<ul style={styles} className={`z-100 flex w-fit flex-col items-center rounded-[10px] bg-white text-md text-gray-500 ${classNames}`}>
			{items.map((item, index) => (
				<li className="cursor-pointer p-[10px_35px]" key={index}>
					<Link href={item.href}>{item.name}</Link>
				</li>
			))}
		</ul>
	);
};

const Header: React.FC<HeaderProps> = ({ loggedIn, alarm }) => {
	const [isMenuExpanded, setIsMenuExpanded] = useState(false);
	const [alarmCount, setAlarmCount] = useState(alarm);

	const customShadowStyle = {
		boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
	};

	const expandedMenuList: Item[] = [
		{ name: "위키목록", href: "/" },
		{ name: "자유게시판", href: "/" },
		{ name: "알림", href: "/" },
		{ name: "마이페이지", href: "/" },
	];

	const handleExpandedMenu = () => {
		setIsMenuExpanded((prevState) => !prevState);
	};

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

	useEffect(() => {
		setAlarmCount(alarm);
	}, [alarm]); //알림 카운트 변경 시 리렌더링

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
							<span className="relative cursor-pointer">
								<Alarm height="32" width="32" />
								{alarmCount > 0 && <span className="absolute right-[4px] top-[-2px] h-[9px] w-[9px] rounded-full bg-red-200"></span>}
							</span>
							<Link href="/" className="relative h-[32px] w-[32px] rounded-full">
								{/* { 프로필 이미지, 클릭 시 마이페이지로 이동 } */}
								<Profile height="32" width="32" />
							</Link>
						</li>
						<li onClick={handleExpandedMenu} className="ml-auto inline-block cursor-pointer tablet:hidden">
							<MenuIcon width="24" height="24" />
						</li>
					</>
				)}
			</ul>
			{isMenuExpanded && window.innerWidth < 768 && (
				<ExpandedMenu classNames="absolute top-[50px] right-[20px]" styles={customShadowStyle} items={expandedMenuList} />
			)}
		</header>
	);
};

export default Header;
