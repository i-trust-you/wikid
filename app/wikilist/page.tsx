"use client";

import ProfileCard from "@/wikilist/_components/ProfileCard";
import SearchBar from "@/wikilist/_components/SearchBar";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
	const [name, setName] = useState<string>("");

	const handleSearchBar = (value: string) => {
		console.log(value);
		setName(value);
	};

	const profiles = [
		{
			image: "/images/not_found.png",
			name: "김동욱",
			area: "서울, 대한민국",
			job: "대학생",
			url: "https://www.wikied.kr/kimdong",
		},
		{
			image: "/images/not_found.png",
			name: "김동욱",
			area: "서울, 대한민국",
			job: "대학생",
			url: "https://www.wikied.kr/kimdong",
		},
		{
			image: "/images/not_found.png",
			name: "김동욱",
			area: "서울, 대한민국",
			job: "대학생",
			url: "https://www.wikied.kr/kimdong",
		},
	];

	return (
		<main className="flex h-full min-h-screen justify-center px-[21px] py-[80px] tablet:px-6">
			<div className="flex w-full max-w-[860px] flex-col">
				<SearchBar onChange={handleSearchBar} />
				{profiles.length < 1 ? (
					<div className="flex grow flex-col items-center justify-center">
						<p className="text-2lg font-medium text-gray-400">"{name}"과 일치하는 검색 결과가 없어요.</p>
						<Image src="/images/search.png" width={108} height={108} alt="검색 사진" className="mt-[35px] tablet:h-[144px] tablet:w-[144px]" />
					</div>
				) : (
					<>
						<p className="mt-4 text-md font-normal text-gray-400">
							"{name}"님을 총 <span className="text-primary-300">{profiles.length}</span>명 찾았습니다.
						</p>
						<div className="mt-10 flex flex-col gap-6 tablet:mt-[57px]">
							{profiles.map((profile) => (
								<ProfileCard profile={profile} />
							))}
							{/* TODO: pagination 컴포넌트로 변경 */}
							<div className="mt-[54px] flex justify-center tablet:mt-20 desktop:mt-[120px]">pagination</div>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
