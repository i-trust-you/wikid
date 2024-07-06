"use client";

import Toast from "@/_utilities/Toast";
import React, { useCallback } from "react";

import LinkIcon from "../../../public/icons/LinkIcon";

interface Props {
	code: string;
}

export default function BackLink({ code }: Props) {
	const currentProtocol = window.location.protocol;
	const currentHostname = window.location.hostname;
	const currentPort = window.location.port;

	const url = `${currentProtocol}//${currentHostname}${currentPort === "" ? "" : `:${currentPort}`}/wiki/${code}`;

	const copyTextToClipboard = useCallback(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text); // 클립보드에 복사

			// 상태 표시 코드
			//
		} catch (error) {
			console.error("클립보드 복사 실패");
		}
	}, []);

	const onClickCopy = useCallback(() => {
		copyTextToClipboard(url);
		Toast.success("위키 링크가 복사되었습니다.");
	}, [copyTextToClipboard, url]);

	return (
		<button className="flex items-center gap-[5px] rounded-[10px] bg-primary-100 p-[5px_10px] text-md text-primary-200" onClick={onClickCopy}>
			<LinkIcon height="20" width="20" color="#4CBFA4" />
			<p className="line-clamp-1">{url}</p>
		</button>
	);
}
