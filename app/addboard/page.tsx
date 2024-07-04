"use client";

import API from "@/_api";
import Modal from "@/_utilities/Modal";
import Toast from "@/_utilities/Toast";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";



import useCookie from "@/_hooks/useCookie";



import Button from "@/_components/common/Button";



import AlignCenterIcon from "../../public/icons/AlignCenterIcon";
import AlignLeftIcon from "../../public/icons/AlignLeftIcon";
import AlignRightIcon from "../../public/icons/AlignRightIcon";
import BoldIcon from "../../public/icons/BoldIcon";
import BulletIcon from "../../public/icons/BulletIcon";
import CameraIcon from "../../public/icons/CameraIcon";
import ColoringIcon from "../../public/icons/ColoringIcon";
import ImageIcon from "../../public/icons/ImageIcon";
import ItalicIcon from "../../public/icons/ItalicIcon";
import LinkIcon from "../../public/icons/LinkIcon";
import NumberingIcon from "../../public/icons/NumberingIcon";
import UnderlineIcon from "../../public/icons/UnderlineIcon";


export default function Page() {
	const router = useRouter();

	const [accessToken, setAccessToken] = useCookie<string>("accessToken");
	const [refreshoken, setRefreshToken] = useCookie<string>("refreshToken");

	if (!accessToken && !refreshoken) {
		router.push("/");
	}

	const [image, setImage] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const onSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			API["{teamId}/articles"].POST({}, { image, title, content }).then((response) => {
				router.push(`/boards/${response.id}`);
			});
		},
		[image, title, content],
	);

	const modal = useMemo(() => new Modal(<Page.Modal onUpload={(response) => setImage(response.url)}/>, (modal) => modal.shake()), []);

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
						<div onClick={() => modal.open()}>
							<ImageIcon width="24" height="24" />
						</div>
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

Page.Modal = function UploadModal(props: Readonly<{ onUpload: (response: Awaited<ReturnType<(typeof API)["{teamId}/images/upload"]["POST"]>>) => void }>) {
	const [file, setFile] = useState<File>();
	const [preview, setPreview] = useState<FileReader["result"]>();

	const onUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			if (!/^[a-zA-Z0-9._\-\s]+\.(png|jpe?g)$/.test(file.name)) {
				return Toast.error("이미지의 확장자를 확인해주세요");
			}
			if (file.size > 1024 /* 1KB = 1024byte */ * 1024 /* 1MB = 1024KB */ * 5) {
				return Toast.error("최대 5MB의 이미지만 업로그 가능합니다");
			}
			const reader = new FileReader();

			reader.addEventListener("load", (event) => {
				setPreview(reader.result);
			});
			reader.readAsDataURL(file);

			setFile(file);
		} else {
			setFile(undefined);
			setPreview(undefined);
		}
	}, []);

	const onSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (file) {
				// gtfo
				Modal.close();

				API["{teamId}/images/upload"].POST({}, file).then((response) => props.onUpload(response));
			}
		},
		[file, preview],
	);

	return (
		<form onSubmit={onSubmit}>
			<div className="flex justify-center text-2lg font-semibold text-gray-500">이미지</div>
			<label
				htmlFor="upload"
				className="mt-[22px] flex h-max min-h-[160px] w-[240px] items-center justify-center rounded-[10px] bg-gray-100 bg-cover bg-center tablet:w-[354px]"
				style={{ backgroundImage: `url("${preview}")` }}
			>
				<CameraIcon width="36" height="36" />
				<input id="upload" type="file" accept="image/*" multiple={false} className="hidden" onChange={onUpload} />
			</label>
			<div className="mt-[20px] flex flex-row-reverse">
				<button
					type="submit"
					className="flex h-[40px] items-center rounded-[10px] bg-primary-200 px-[20px] text-md font-semibold text-white disabled:bg-gray-300"
					disabled={!preview}
				>
					삽입하기
				</button>
			</div>
		</form>
	);
};
