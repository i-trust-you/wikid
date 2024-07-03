"use client";

import API from "@/_api";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import useLocalStorage from "@/_hooks/useLocalStorage";

import Button from "@/_components/common/Button";

import AlignCenterIcon from "../../public/icons/AlignCenterIcon";
import AlignLeftIcon from "../../public/icons/AlignLeftIcon";
import AlignRightIcon from "../../public/icons/AlignRightIcon";
import BoldIcon from "../../public/icons/BoldIcon";
import BulletIcon from "../../public/icons/BulletIcon";
import ColoringIcon from "../../public/icons/ColoringIcon";
import ImageIcon from "../../public/icons/ImageIcon";
import ItalicIcon from "../../public/icons/ItalicIcon";
import LinkIcon from "../../public/icons/LinkIcon";
import NumberingIcon from "../../public/icons/NumberingIcon";
import UnderlineIcon from "../../public/icons/UnderlineIcon";

export default function Page() {
	const router = useRouter();
	const [accessToken, setAccessToken] = useLocalStorage<string | null>("accessToken", null);

	if (!accessToken) {
		redirect("/");
	}
	API.credential(accessToken);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const onSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			API["{teamId}/articles"].POST({}, { title, content, image: "https://example.com" }).then((response) => {
				router.push(`/boards/${response.id}`);
			});
		},
		[title, content],
	);

	return (
		<main className="flex w-screen flex-col items-center">
			<form
				onSubmit={onSubmit}
				className="mt-[32px] flex min-h-[680px] w-full flex-col px-[20px] tablet:mx-[60px] tablet:mt-[40px] tablet:w-[calc(100%-120px)] tablet:rounded-[10px] tablet:pb-[30px] tablet:pt-[40px] tablet:shadow-[0px_4px_20px_0px_#00000014] desktop:min-h-[850px] desktop:w-[1060px]"
			>
				<div className="flex justify-between text-lg font-semibold text-gray-500 tablet:text-2xl">
					게시물 등록하기
					<button
						disabled={!(0 < title.length && 0 < content.length)}
						className="h-[45px] w-[72px] rounded-[10px] bg-primary-200 text-md font-semibold text-white disabled:bg-gray-300 disabled:text-white tablet:w-[140px]"
					>
						등록하기
					</button>
				</div>
				<div className="mt-[16px] text-xs font-normal text-gray-400 tablet:mt-[24px] tablet:text-lg">등록일 {new Date().toLocaleDateString()}</div>
				<div className="mt-[20px] flex gap-[10px] border-y border-gray-200 tablet:mt-[25px]">
					<input
						maxLength={30}
						// @ts-ignore
						onPaste={(event) => setTitle(event.target.value)}
						onChange={(event) => setTitle(event.target.value)}
						className="flex h-[50px] grow text-lg font-medium text-gray-500 outline-none placeholder:text-gray-400 tablet:text-xl"
						placeholder="제목을 입력해주세요"
					/>
					<div className="flex items-center text-sm font-medium text-gray-500">
						{title.length}/<div className="text-primary-200">30</div>
					</div>
				</div>
				<div className="my-[16px] text-md font-medium text-gray-600 tablet:my-[20px] tablet:text-lg">
					공백포함: 총 {content.length}자 | 공백제외 총 {content.replace(/\s/g, "").length}자
				</div>
				<textarea
					cols={1}
					// @ts-ignore
					onPaste={(event) => setContent(event.target.value)}
					onChange={(event) => setContent(event.target.value)}
					className="w-full grow resize-none text-gray-500 outline-none placeholder:text-gray-300 tablet:text-xl"
					placeholder="본문을 입력해주세요"
				/>
				<div className="flex h-[44px] items-center justify-between gap-[16px] rounded-full border px-[10px]">
					<div className="flex gap-[4px]">
						<BoldIcon width="24" height="24" />
						<ItalicIcon width="24" height="24" />
						<UnderlineIcon width="24" height="24" />
						<AlignLeftIcon width="24" height="24" />
						<AlignCenterIcon width="24" height="24" />
						<AlignRightIcon width="24" height="24" />
						<BulletIcon width="24" height="24" />
						<NumberingIcon width="24" height="24" />
						<ColoringIcon width="24" height="24" />
						<ImageIcon width="24" height="24" />
					</div>
					<div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-gray-200">
						<LinkIcon width="16" height="16" />
					</div>
				</div>
			</form>
			<div className="mt-[32px] h-[45px] w-[140px]">
				<Button style="outline">목록으로</Button>
			</div>
		</main>
	);
}
