"use client";

import API from "@/_api";
import Toast from "@/_utilities/Toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import useCookie from "@/_hooks/useCookie";

import Form from "@/_components/general/Form";

export default function Page() {
	const router = useRouter();

	const [accessToken, setAccessToken] = useCookie<string>("accessToken");
	const [refreshoken, setRefreshToken] = useCookie<string>("refreshToken");

	if (accessToken && refreshoken) {
		router.push("/");
	}

	const handle = useCallback((data: FormData) => {
		// @ts-ignore
		const payload: Parameters<(typeof API)["{teamId}/auth/signUp"]["POST"]>[1] = {};

		for (const [key, value] of data.entries()) {
			payload[key as keyof typeof payload] = value as (typeof payload)[keyof typeof payload];
		}
		// TODO: display error
		API["{teamId}/auth/signUp"]
			.POST({}, payload)
			.then((response) => {
				Toast.success("회원가입이 완료되었습니다");
				router.push("/login");
			})
			.catch((error) => {
				Toast.error("회원가입 실패");
			});
	}, []);

	return (
		<main className="flex flex-col items-center">
			<div className="mt-[60px] text-2xl font-semibold text-gray-500 tablet:mt-[170px] desktop:mt-[140px]">회원가입</div>
			<div className="mt-[64px] flex w-full flex-col gap-[32px] px-[20px] tablet:max-w-[400px] tablet:px-0">
				<Form onSubmit={handle}>
					<div className="flex flex-col gap-[24px]">
						<div className="flex flex-col gap-[10px]">
							<Form.Label for="name">이름</Form.Label>
							<Form.Input.Text
								id="name"
								required={{ value: true, message: "이름을 입력해주세요" }}
								maxlength={{ value: 8, message: "10자 이하 입력해주세요" }}
							/>
							<Form.Error for="name" />
						</div>
						<div className="flex flex-col gap-[10px]">
							<Form.Label for="email">이메일</Form.Label>
							<Form.Input.Text
								id="email"
								pattern={{ value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: "올바른 이메일을 입력해주세요" }}
								required={{ value: true, message: "이메일을 입력해주세요" }}
							/>
							<Form.Error for="email" />
						</div>
						<div className="flex flex-col gap-[10px]">
							<Form.Label for="password">비밀번호</Form.Label>
							<Form.Input.Text
								id="password"
								pattern={{ value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/, message: "영어 대소문자, 아라비아 숫자, 특수기호(!@#$%^&*)를 사용 가능합니다" }}
								minlength={{ value: 8, message: "8자 이상 입력해주세요" }}
								required={{ value: true, message: "비밀번호를 입력해주세요" }}
							/>
							<Form.Error for="password" />
						</div>
						<div className="flex flex-col gap-[10px]">
							<Form.Label for="passwordConfirmation">비밀번호 확인</Form.Label>
							<Form.Input.Text
								id="passwordConfirmation"
								sync={{ value: "password", message: "비밀번호가 일치하지 않습니다" }}
								required={{ value: true, message: "비밀번호를 다시 한번 입력해주세요" }}
							/>
							<Form.Error for="passwordConfirmation" />
						</div>
					</div>
					<div className="mt-[32px] h-[45px] w-full tablet:mt-[30px]">
						<Form.Submit>가입하기</Form.Submit>
					</div>
				</Form>
			</div>
			<div className="mb-[111px] mt-[40px] text-md font-normal text-gray-400 tablet:mb-[263px] desktop:mb-[224px]">
				이미 회원이신가요?{" "}
				<Link href="/login" className="text-primary-200">
					로그인
				</Link>
			</div>
		</main>
	);
}
