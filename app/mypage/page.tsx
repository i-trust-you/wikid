"use client";

import API from "@/_api";
import { redirect } from "next/navigation";
import { useCallback, useEffect } from "react";

import useLocalStorage from "@/_hooks/useLocalStorage";

import Form from "@/_components/general/Form";

export default function Page() {
	const [accessToken, setAccessToken] = useLocalStorage<string | null>("accessToken", null);

	useEffect(() => {
		if (accessToken) {
			API.credential(accessToken);
		}
	}, [accessToken]);

	const changePassword = useCallback((data: FormData) => {
		// @ts-ignore
		const payload: Parameters<(typeof API)["{teamId}/users/me/password"]["PATCH"]>[1] = {};

		for (const [key, value] of data.entries()) {
			payload[key as keyof typeof payload] = value as (typeof payload)[keyof typeof payload];
		}
		// TODO: display error
		API["{teamId}/users/me/password"].PATCH({}, payload).then((response) => {
			alert("비밀번호가 변경되었습니다");
		});
	}, []);

	const createProfile = useCallback((data: FormData) => {
		// @ts-ignore
		const payload: Parameters<(typeof API)["{teamId}/profiles"]["POST"]>[1] = {};

		for (const [key, value] of data.entries()) {
			payload[key as keyof typeof payload] = value as (typeof payload)[keyof typeof payload];
		}
		// TODO: display error
		API["{teamId}/profiles"].POST({}, payload).then((response) => {
			alert("위키가 생성되었습니다");
		});
	}, []);

	return (
		<main className="flex flex-col items-center">
			<div className="mt-[170px] text-2xl font-semibold text-gray-500 tablet:mt-[212px] desktop:mt-[141px]">계정 설정</div>
			<div className="mt-[64px] flex flex-col gap-[32px]">
				<Form onSubmit={changePassword}>
					<div className="flex flex-col gap-[10px] text-md font-normal text-gray-500">
						비밀번호 변경
						<div className="flex flex-col gap-[8px]">
							<Form.Input.Text
								id="currentPassword"
								placeholder="기존 비밀번호"
								pattern={{ value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/, message: "영어 대소문자, 아라비아 숫자, 특수기호(!@#$%^&*)를 사용 가능합니다" }}
								minlength={{ value: 8, message: "8자 이상 입력해주세요" }}
								required={{ value: true, message: "기존 비밀번호를 입력해주세요" }}
							/>
							<Form.Input.Text
								id="password"
								placeholder="새 비밀번호"
								pattern={{ value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/, message: "영어 대소문자, 아라비아 숫자, 특수기호(!@#$%^&*)를 사용 가능합니다" }}
								minlength={{ value: 8, message: "8자 이상 입력해주세요" }}
								required={{ value: true, message: "새 비밀번호를 입력해주세요" }}
							/>
							<Form.Input.Text
								id="passwordConfirmation"
								placeholder="새 비밀번호 확인"
								sync={{ value: "password", message: "비밀번호가 일치하지 않습니다" }}
								pattern={{ value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/, message: "영어 대소문자, 아라비아 숫자, 특수기호(!@#$%^&*)를 사용 가능합니다" }}
								minlength={{ value: 8, message: "8자 이상 입력해주세요" }}
								required={{ value: true, message: "새 비밀번호 확인을 입력해주세요" }}
							/>
						</div>
					</div>
					<div className="mt-[16px] flex w-full flex-row-reverse">
						<div className="h-[40px]">
							<Form.Submit>변경하기</Form.Submit>
						</div>
					</div>
				</Form>
				<hr />
				<Form onSubmit={createProfile}>
					<div className="flex flex-col gap-[10px] text-md font-normal text-gray-500">
						위키 생성하기
						<div className="flex flex-col gap-[8px]">
							<Form.Input.Select id="securityQuestion" required={{ value: true, message: "질문을 입력해주세요" }}>
								{[
									"The phrase 'it’s just a game' is such a weak mindset.",
									"확실히 아이폰을 사고 나서 내 인생이 달라졌다",
									"PC방에서 코딩하면 멋있게 보이려나",
									"skill issue :skull:",
								]}
							</Form.Input.Select>
							<Form.Input.Text id="securityAnswer" placeholder="답을 입력해 주세요" required={{ value: true, message: "답을 입력해주세요" }} />
						</div>
					</div>
					<div className="mt-[16px] flex w-full flex-row-reverse">
						<div className="h-[40px]">
							<Form.Submit>생성하기</Form.Submit>
						</div>
					</div>
				</Form>
			</div>
		</main>
	);
}
