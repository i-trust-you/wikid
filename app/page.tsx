"use client";

import { useRouter } from "next/navigation";
import React from "react";

import Button from "./_components/common/Button";

export default function Page() {
	const router = useRouter();
	const handleClick = () => {
		alert("회원가입됐습니다");
		router.push("/login");
	};

	const isSubmitted = "" || "" || !"";

	return (
		<div className="flex flex-col gap-[10px]">
			<div className="w-50 relative h-10">
				<Button href="/board" buttonStyle="outline">
					목록으로
				</Button>
			</div>
			<div className="w-50 relative h-10">
				<Button onClick={handleClick}>회원가입</Button>
			</div>
			<div className="w-50 relative h-10">
				<Button disabled={isSubmitted} buttonStyle="basic">
					로그인
				</Button>
			</div>
			<div className="w-50 relative h-10">
				<Button href="/board" buttonStyle="cancel">
					취소
				</Button>
			</div>
		</div>
	);
}
