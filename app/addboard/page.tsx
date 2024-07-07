"use client";

import API from "@/_api";
import Modal from "@/_utilities/Modal";
import Toast from "@/_utilities/Toast";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import useCookie from "@/_hooks/useCookie";

import Button from "@/_components/common/Button";
import Markdown from "@/_components/common/Markdown";

import CameraIcon from "../../public/icons/CameraIcon";

const [MIN_TITLE, MAX_TITLE] = [1, 30];

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

	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		setDisabled(!(MIN_TITLE <= title.length && title.length <= MAX_TITLE));
	}, [title, content]);

	const modal = useMemo(() => new Modal(<Page.Modal onUpload={(response) => setImage(response.url)} />, (modal) => modal.shake()), []);

	return (
		<main className="flex w-full flex-col items-center tablet:px-[60px] tablet:py-[30px] desktop:pt-[60px]">
			<form className="tablet:shadow-lg h-full w-full overflow-hidden desktop:container tablet:rounded-[10px]" onSubmit={onSubmit}>
				<div className="relative flex h-[150px] items-center justify-center overflow-hidden tablet:rounded-t-[10px]" onClick={() => modal.open()}>
					<div style={{ backgroundImage: `url("${image}")` }} className="absolute inset-0 bg-gray-400 bg-cover bg-center" />
					<div className="absolute inset-0 flex items-center justify-center text-3xl text-gray-300">대표 사진</div>
				</div>
				<div className="mx-[15px] mt-[15px] flex h-[45px] items-center gap-[15px]">
					<input
						onChange={(event) => setTitle(event.target.value)}
						className="h-full grow rounded-[10px] border border-gray-300 px-[10px] outline-none"
						placeholder="제목을 입력해주세요"
					/>
					<div>
						<Button disabled={disabled} href="/boards">
							작성하기
						</Button>
					</div>
				</div>
				<div className="px-[15px] py-[15px]">
					<Markdown data={content} onChange={(_) => setContent(_)} />
				</div>
			</form>
			<div className="mt-[32px] h-[45px] w-[140px]">
				<Button style="outline" href="/boards">목록으로</Button>
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
				<CameraIcon width={36} height={36} />
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
