"use client";

import API from "@/_api";
import ProfileCard from "@/wikilist/_components/ProfileCard";
import SearchBar from "@/wikilist/_components/SearchBar";
import Image from "next/image";
import { useEffect, useState } from "react";

type Profile = {
	totalCount: number;
	list: {
		updatedAt: string;
		job: string;
		nationality: string;
		city: string;
		image: string | null;
		code: string;
		name: string;
		id: number;
	}[];
};

export default function Page() {
	const [name, setName] = useState<string>("");
	const [profiles, setProfiles] = useState<Profile["list"] | undefined>();
	const [totalProfiles, setTotalProfiles] = useState<number>(0);

	const handleSearchBar = (value: string) => {
		setName(value);
	};

	useEffect(() => {
		const getProfiles = async (keyword: string) => {
			const response = await API["{teamId}/profiles"].GET({ teamId: "6-11", page: 1, pageSize: 3, name: keyword });
			setTotalProfiles(response.totalCount);
			setProfiles(response.list);
		};

		if (name !== "") {
			getProfiles(name);
		} else {
			setProfiles([]);
			setTotalProfiles(0);
		}
	}, [name]);

	return (
		<main className="flex h-full min-h-screen justify-center px-[21px] py-[80px] tablet:px-6">
			<div className="flex w-full max-w-[860px] flex-col">
				<SearchBar onChange={handleSearchBar} />
				{!profiles || totalProfiles < 1 ? (
					<div className="flex grow flex-col items-center justify-center">
						<p className="text-2lg font-medium text-gray-400">
							{!profiles || name === "" ? "원하는 위키를 검색해주세요." : `"${name}"과 일치하는 검색 결과가 없어요.`}
						</p>
						<Image src="/images/search.png" width={108} height={108} alt="검색 사진" className="mt-[35px] tablet:h-[144px] tablet:w-[144px]" />
					</div>
				) : (
					<>
						<p className="mt-4 text-md font-normal text-gray-400">
							"{name}"님을 총 <span className="text-primary-300">{totalProfiles}</span>명 찾았습니다.
						</p>
						<div className="mt-10 flex flex-col gap-6 tablet:mt-[57px]">
							{profiles?.map((profile) => <ProfileCard key={profile.id} profile={profile} />)}
							{/* TODO: pagination 컴포넌트로 변경 */}
							<div className="mt-[54px] flex justify-center tablet:mt-20 desktop:mt-[120px]">pagination</div>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
