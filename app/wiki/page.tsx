"use client";

import { useRouter } from "next/navigation";

import Button from "@/_components/common/Button";
import Form from "@/_components/general/Form";

const MyWikiPage = () => {
	const router = useRouter();
	const handleCancle = () => {
		confirm("정보가 저장되지 않았습니다. 취소하시겠습니까?");
		router.push("/wiki");
	};
	return (
		<>
			{/* <div className="m-auto flex w-[335px] flex-col tablet:w-[624px] desktop:w-[860px]">
				<div className="flex flex-col gap-6 tablet:gap-8">
					<div className="flex justify-between">
						<h1 className="text-3xl font-semibold text-gray-500 tablet:text-5xl">이름</h1> */}
			{/* // TODO: onClick - 본인 : 수정기능(프로필 까지), 다른 유저 : 위키 내용만 변경 가능  */}
			{/* <div className="h-[43px] w-[120px] tablet:h-[45px] tablet:w-[160px]">
							<Button href="/wiki">위키 참여하기</Button>
						</div>
					</div>
					<BackLink>test</BackLink>
				</div>
			</div> */}

			<Form onSubmit={(data) => console.log(data)}>
				<div className="flex justify-between">
					{/* // TODO: 마크다운 부분 */}
					<div>마크다운 작성</div>
					<div className="flex flex-col gap-1 tablet:gap-[6px] desktop:gap-2">
						<div className="shadow-basic flex h-[511px] w-[335px] flex-col tablet:h-[388px] tablet:w-[624px] desktop:h-[828px] desktop:w-[400px]">
							<div className="m-auto h-[62px] w-[62px] tablet:h-[71px] tablet:w-[71px] desktop:h-[200px] desktop:w-[200px]">
								<Form.Input.Image id="pofile" />
							</div>
							<div className="m-auto flex h-[384px] w-[268px] flex-col gap-4 rounded-[10px] text-xs font-normal text-gray-400 tablet:h-[228px] tablet:w-[592px] tablet:flex-row tablet:gap-10 tablet:text-md desktop:h-[472px] desktop:w-[320px] desktop:flex-col desktop:gap-4">
								<div className="flex h-[184px] flex-col gap-4">
									<div className="flex h-[34px] items-center justify-between gap-2 tablet:gap-4 desktop:gap-5">
										<Form.Label for="city">거주 도시</Form.Label>
										<Form.Input.Text id="city" />
									</div>
									<div className="flex items-center justify-between gap-2 tablet:gap-4 desktop:gap-5">
										<Form.Label for="mbti">MBTI</Form.Label>
										<Form.Input.Text id="mbti" />
									</div>
									<div className="flex items-center justify-between gap-2 tablet:gap-4 desktop:gap-5">
										<Form.Label for="job">직업</Form.Label>
										<Form.Input.Text id="job" />
									</div>
									<div className="flex h-[34px] items-center justify-between gap-2 tablet:gap-4 desktop:gap-5">
										<Form.Label for="sns">SNS 계정</Form.Label>
										<Form.Input.Text id="sns" />
									</div>
								</div>
								<div className="flex h-[184px] flex-col gap-4">
									<div className="flex items-center justify-between gap-2 tablet:gap-4 desktop:gap-5">
										<Form.Label for="birthday">생일</Form.Label>
										<Form.Input.Text id="birthday" />
									</div>
									<div className="flex items-center justify-between gap-2 tablet:gap-4 desktop:gap-5">
										<Form.Label for="nickname">별명</Form.Label>
										<Form.Input.Text id="nickname" />
									</div>
									<div className="flex items-center justify-between gap-2 tablet:gap-4 desktop:gap-5">
										<Form.Label for="bloodtype">혈액형</Form.Label>
										<Form.Input.Text id="bloodtype" />
									</div>
									<div className="flex items-center justify-between gap-2 tablet:gap-4 desktop:gap-5">
										<Form.Label for="nationality">국적</Form.Label>
										<Form.Input.Text id="nationality" />
									</div>
								</div>
							</div>
						</div>

						{/* TODO: mobile-tablet: 최상에 위치 / desktop : 하단에 위치 */}
						<div className="flex gap-[6px]">
							<div className="h-10 w-[70px] text-center">
								<Button style="outline" onClick={handleCancle}>
									취소
								</Button>
							</div>
							<div className="h-10 w-[70px]">
								<Form.Submit>저장</Form.Submit>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</>
	);
};

export default MyWikiPage;
