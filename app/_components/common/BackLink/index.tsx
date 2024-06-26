"use client";

import React from "react";

interface Props {
	children: string;
}

export default function BackLink({ children }: Props) {
	const copyTextToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
		} catch (error) {
			console.error("클립보드 복사 실패");
		}
	};

	function onClickCopy() {
		copyTextToClipboard(children);
	}

	return <button onClick={onClickCopy}>{children}</button>;
}
