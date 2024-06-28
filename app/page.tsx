"use client";

import Form from "@/_components/general/Form";

export default function Page() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<Form onSubmit={(data) => console.log(data)}>
				<div className="flex flex-col gap-[24px]">
					<div className="flex flex-col gap-[10px]">
						<Form.Label for="email">이메일</Form.Label>
						<Form.Input.Text id="email" required={{ value: true, message: "이메일을 입력해주세요" }} />
						<Form.Error for="email" />
					</div>
					<div className="flex flex-col gap-[10px]">
						<Form.Label for="password">비밀번호</Form.Label>
						<Form.Input.Text id="password" pattern={{ value: /^[\d\D]{3}$/, message: "ㅇ" }} required={{ value: true, message: "비밀번호를 입력해주세요" }} />
						<Form.Error for="password" />
					</div>
					<div className="flex flex-col gap-[10px]">
						<Form.Label for="confirmPassword">비밀번호 확인</Form.Label>
						<Form.Input.Text
							id="confirmPassword"
							sync={{ value: "password", message: "비밀번호가 일치하지 않습니다" }}
							required={{ value: true, message: "비밀번호를 다시 한번 입력해주세요" }}
						/>
						<Form.Error for="confirmPassword" />
					</div>
					<div className="flex flex-col gap-[10px]">
						<Form.Input.Select id="test1" required={{ value: true, message: "ㅇㅇ을 입력해주세요" }}>
							{new Array(5).fill(null).map((_, index) => index.toString())}
						</Form.Input.Select>
						<Form.Error for="test1" />
					</div>
					<div className="flex flex-col gap-[10px]">
						<Form.Input.Select id="test2" sync={{ value: "test1", message: "ㅇㅇ 가 일치하지 않습니다" }} required={{ value: true, message: "ㅇㅇ을 입력해주세요" }}>
							{new Array(5).fill(null).map((_, index) => index.toString())}
						</Form.Input.Select>
						<Form.Error for="test2" />
					</div>
					<div>
						<Form.Input.Image id="test3" required={{ value: true, message: "ㅇㅇ을 입력해주세요" }}/>
					</div>
					<Form.Submit>
						어쩌라고
					</Form.Submit>
				</div>
			</Form>
		</div>
	);
}
