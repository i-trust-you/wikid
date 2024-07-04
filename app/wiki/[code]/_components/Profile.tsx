"use client";

import API from "@/_api";
import Image from "next/image";
import { useState } from "react";

import useMediaQuery from "@/_hooks/useMediaQuery";

import ArrowDownIcon from "../../../../public/icons/ArrowDownIcon";

type ProfileData = Awaited<ReturnType<(typeof API)["{teamId}/profiles/{code}"]["GET"]>>;

type Props = {
	profile: ProfileData;
};

export default function Profile({ profile }: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const isLargeScreen = useMediaQuery("(min-width: 1200px)");

	return (
		<div className="flex w-full flex-col rounded-[10px] bg-white px-5 py-[15px] shadow-basic tablet:px-[30px] tablet:py-5 desktop:w-[320px] desktop:py-[60px]">
			<div className="flex desktop:flex-col">
				<Image
					src={profile?.image ?? "/images/not_found.png"}
					width={200}
					height={200}
					alt="프로필 이미지"
					className="h-full max-h-[62px] w-full max-w-[62px] rounded-full object-cover tablet:max-h-[71px] tablet:max-w-[71px] desktop:m-auto desktop:max-h-[200px] desktop:max-w-[200px]"
				/>
				<table className="ml-5 grow desktop:mt-[60px] desktop:grow-0">
					<tbody className="flex flex-col gap-2 text-left text-xs font-normal tablet:text-md desktop:gap-4">
						<tr>
							<th className="w-[60px] font-normal text-gray-400">거주 도시</th>
							<td className="pl-[10px] text-gray-500">{profile.city === "" ? "-" : profile.city}</td>
						</tr>
						<tr>
							<th className="w-[60px] font-normal text-gray-400">MBTI</th>
							<td className="pl-[10px] text-gray-500">{profile.mbti === "" ? "-" : profile.mbti}</td>
						</tr>
						<tr>
							<th className="w-[60px] font-normal text-gray-400">직업</th>
							<td className="pl-[10px] text-gray-500">{profile.job === "" ? "-" : profile.job}</td>
						</tr>
						{(isLargeScreen || isOpen) && (
							<>
								<tr>
									<th className="w-[60px] font-normal text-gray-400">SNS 계정</th>
									<td className="pl-[10px] text-gray-500">{profile.sns === "" ? "-" : profile.sns}</td>
								</tr>
								<tr>
									<th className="w-[60px] font-normal text-gray-400">생일</th>
									<td className="pl-[10px] text-gray-500">{profile.birthday === "" ? "-" : profile.birthday}</td>
								</tr>
								<tr>
									<th className="w-[60px] font-normal text-gray-400">별명</th>
									<td className="pl-[10px] text-gray-500">{profile.nickname === "" ? "-" : profile.nickname}</td>
								</tr>
								<tr>
									<th className="w-[60px] font-normal text-gray-400">혈액형</th>
									<td className="pl-[10px] text-gray-500">{profile.bloodType === "" ? "-" : profile.bloodType}</td>
								</tr>
								<tr>
									<th className="w-[60px] font-normal text-gray-400">국적</th>
									<td className="pl-[10px] text-gray-500">{profile.nationality === "" ? "-" : profile.nationality}</td>
								</tr>
							</>
						)}
					</tbody>
				</table>
			</div>
			{!isLargeScreen && (
				<div
					className={`${isOpen && "rotate-180"} m-auto cursor-pointer rounded-[5px] transition hover:bg-gray-100 active:bg-gray-200`}
					onClick={() => setIsOpen((prev) => !prev)}
				>
					<ArrowDownIcon width="24" height="24" />
				</div>
			)}
		</div>
	);
}
