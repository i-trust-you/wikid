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
		const payload: Parameters<(typeof API)["{teamId}/auth/signIn"]["POST"]>[1] = {};

		for (const [key, value] of data.entries()) {
			payload[key as keyof typeof payload] = value as (typeof payload)[keyof typeof payload];
		}
		// TODO: display error
		API["{teamId}/auth/signIn"]
			.POST({}, payload)
			.then((response) => {
				Toast.success("로그인이 완료되었습니다");
				setAccessToken(response.accessToken);
				setRefreshToken(response.refreshToken);
				router.push("/");
			})
			.catch((error) => {
				Toast.error("로그인 실패");
			});
	}, []);

	return (
		<main className="flex flex-col items-center">
			<div className="mt-[143px] text-2xl font-semibold text-gray-500 tablet:mt-[281px] desktop:mt-[261px]">로그인</div>
			<div className="mt-[32px] tablet:mt-[48px] desktop:mt-[64px]">
				<Form onSubmit={handle}>
					<div className="flex flex-col gap-[24px]">
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
					</div>
					<div className="mt-[32px] h-[45px] w-full tablet:mt-[30px]">
						<Form.Submit>가입하기</Form.Submit>
					</div>
				</Form>
			</div>
			<div className="mb-[203px] mt-[40px] text-md font-normal text-gray-400 tablet:mb-[387px] desktop:mb-[334px]">
				처음이신가요?{" "}
				<Link href="/signup" className="text-primary-200">
					회원가입
				</Link>
			</div>
		</main>
	);
}
