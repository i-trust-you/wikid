"use client";

import API from "@/_api";
import Modal from "@/_utilities/Modal";
import { useState } from "react";

import Button from "@/_components/common/Button";

import LockIcon from "../../../../public/icons/LockIcon";

type Props = {
	code: string;
	question: string;
	onSuccess: () => void;
};

export default function QuizModal({ code, question, onSuccess }: Props) {
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [value, setValue] = useState<string>("");

	const handleButtonClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();

		await API["{teamId}/profiles/{code}/ping"]
			.POST({ teamId: "6-11", code }, { securityAnswer: value })
			.then((response) => {
				setErrorMessage("");
				onSuccess();
				Modal.close();
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					setErrorMessage("정답이 아닙니다. 다시 시도해 주세요.");
				}
				setErrorMessage("권한이 없습니다. 로그인해주세요.");
			});
	};

	return (
		<div className="flex flex-col">
			<div className="flex flex-col items-center">
				<div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gray-100">
					<LockIcon width="20" height="20" />
				</div>
				<p className="mt-[10px] text-center text-md font-normal text-gray-400">
					다음 퀴즈를 맞추고
					<br />
					위키를 작성해 보세요.
				</p>
			</div>
			<form className="mt-9">
				<label className="text-2lg font-semibold text-gray-500">{question}</label>
				<div className="relative mt-[10px]">
					<input
						className={`${errorMessage !== "" ? "bg-red-100 outline-red-200" : "bg-gray-100"} w-full rounded-[10px] px-5 py-[10px] text-md font-normal text-gray-500 placeholder:text-gray-400`}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="답안을 입력해 주세요"
					/>
					{errorMessage !== "" && <p className="absolute mt-[10px] text-xs font-normal text-red-200">{errorMessage}</p>}
				</div>
				<div className="mt-10">
					<Button onClick={handleButtonClick}>확인</Button>
				</div>
			</form>
			<p className="mt-5 text-center text-xs font-normal text-gray-400">
				위키드는 지인들과 함께하는 즐거운 공간입니다.
				<br />
				지인에게 상처를 주지 않도록 작성해 주세요.
			</p>
		</div>
	);
}
