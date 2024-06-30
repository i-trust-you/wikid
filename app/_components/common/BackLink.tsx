"use client";

import React, { useCallback } from "react";

import LinkIcon from "../../../public/icons/LinkIcon";

interface Props {
	children: string;
}

export default function BackLink({ children }: Props) {
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
		copyTextToClipboard(children);
	}, [copyTextToClipboard, children]);

	return (
		<button className="flex items-center gap-[5px] rounded-[10px] bg-primary-100 p-[5px_10px] text-md text-primary-200" onClick={onClickCopy}>
			<LinkIcon height="20" width="20" color="#4CBFA4" />
			<span>{children}</span>
		</button>
	);
}
