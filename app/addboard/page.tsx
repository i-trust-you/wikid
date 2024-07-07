"use client";

import API from "@/_api";
import Modal from "@/_utilities/Modal";
import Toast from "@/_utilities/Toast";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useCookie from "@/_hooks/useCookie";

import Button from "@/_components/common/Button";
import Markdown from "@/_components/common/Markdown";

import CameraIcon from "../../public/icons/CameraIcon";

const [FILE_NAME, FILE_SIZE] = [/^[a-zA-Z0-9._\-\s]+\.(?:png|webp|jpe?g)$/, 1024 /* 1KB = 1024byte */ * 1024 /* 1MB = 1024KB */ * 5];

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
		setDisabled(!(1 <= title.length && title.length <= 30));
	}, [title, content]);

	const outline = useRef<HTMLDivElement>(null);

	const onDrop = useCallback((event: React.DragEvent) => {
		// important
		event.preventDefault();
		event.stopPropagation();

		if (1 < event.dataTransfer.items.length) {
			return Toast.error("사진은 한번에 1개씩 업로드 가능합니다.");
		}

		const item = event.dataTransfer.items[0];

		if (item.kind !== "file") {
			return Toast.error("사진을 업로드 해주세요.");
		}

		const file = item.getAsFile() as File;

		if (FILE_SIZE < file.size) {
			return Toast.error("파일의 최대 크기는 5MB 입니다.");
		}
		if (!FILE_NAME.test(file.name)) {
			return Toast.error("지원하는 형식의 사진이 아닙니다.");
		}

		API["{teamId}/images/upload"].POST({}, file).then((response) => setImage(response.url));

		outline.current?.style.setProperty("border-color", null);
	}, []);

	const onDragEnter = useCallback((event: React.DragEvent) => {
		// important
		event.preventDefault();
		event.stopPropagation();

		outline.current?.style.setProperty("border-color", "#474d66");
	}, []);

	const onDragLeave = useCallback((event: React.DragEvent) => {
		// important
		event.preventDefault();
		event.stopPropagation();

		outline.current?.style.setProperty("border-color", null);
	}, []);

	const modal = useMemo(() => new Modal(<Page.Modal onUpload={(response) => setImage(response.url)} />, (modal) => modal.shake()), []);

	return (
		<main className="flex w-full flex-col items-center tablet:px-[60px] tablet:py-[30px] desktop:pt-[60px]">
			<form className="h-full w-full overflow-hidden desktop:container tablet:rounded-[10px] tablet:shadow-lg" onSubmit={onSubmit}>
				<div
					onClick={() => modal.open()}
					onDrop={onDrop}
					onDragEnd={onDrop}
					onDragOver={onDrop}
					onDragEnter={onDragEnter}
					onDragLeave={onDragLeave}
					className="relative flex h-[150px] items-center justify-center overflow-hidden tablet:rounded-t-[10px]"
				>
					<div
						style={{ backgroundImage: `url("${image}")` }}
						className="pointer-events-none absolute inset-0 bg-gray-400 bg-cover bg-center transition-colors hover:bg-gray-500"
					/>
					<div
						ref={outline}
						className="pointer-events-none absolute inset-[5px] flex items-center justify-center rounded-[10px] border-[2.5px] border-dashed border-transparent text-3xl text-gray-300"
					>
						대표 사진
					</div>
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
				<Button style="outline" href="/boards">
					목록으로
				</Button>
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
			if (FILE_SIZE < file.size) {
				return Toast.error("파일의 최대 크기는 5MB 입니다.");
			}
			if (!FILE_NAME.test(file.name)) {
				return Toast.error("지원하는 형식의 사진이 아닙니다.");
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
