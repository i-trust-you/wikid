"use client";

import Image from "next/image";
import React from "react";

import LinkIcon from "../../../../public/icons/link.svg";

interface Props {
	children: string;
}

export default function BackLink({ children }: Props) {
	const copyTextToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text); // 클립보드에 복사

			// 상태 표시 코드
			//
		} catch (error) {
			console.error("클립보드 복사 실패");
		}
	};

	function onClickCopy() {
		copyTextToClipboard(children);
	}

	return (
		<button className="flex items-center gap-[5px] rounded-[10px] bg-[#EEF9F6] p-[5px_10px] text-md text-[#4CBFA4]" onClick={onClickCopy}>
			<Image src={LinkIcon} alt="링크 아이콘" />
			<span>{children}</span>
		</button>
	);
}
