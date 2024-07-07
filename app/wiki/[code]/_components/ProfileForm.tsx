import API from "@/_api";

import Button from "@/_components/common/Button";
import Form from "@/_components/general/Form";

type ProfileData = Awaited<ReturnType<(typeof API)["{teamId}/profiles/{code}"]["GET"]>>;

type Props = {
	profile: ProfileData;
	onCancle: () => void;
};

export default function ProfileForm({ profile, onCancle }: Props) {
	const handleFormSubmit = async (data: FormData) => {
		// TODO: image upload 후 url 받아오기
		// TODO: 받아온 url 사용하여 profile 수정
	};

	return (
		<Form onSubmit={handleFormSubmit}>
			<div className="flex flex-col gap-4 tablet:gap-5 desktop:flex-col-reverse desktop:gap-6">
				<div className="flex justify-end gap-[10px]">
					<div className="h-10 w-[70px]">
						<Button style="outline" onClick={onCancle}>
							취소
						</Button>
					</div>
					<div className="h-10 w-[70px]">
						<Form.Submit>저장</Form.Submit>
					</div>
				</div>
				<div className="flex flex-col rounded-[10px] bg-white px-5 py-[15px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] tablet:px-[30px] tablet:py-5 desktop:w-[320px] desktop:py-[60px]">
					<div className="m-auto h-[62px] w-[62px] tablet:h-[71px] tablet:w-[71px] desktop:h-[200px] desktop:w-[200px]">
						<Form.Input.Image id="image" />
					</div>
					<div className="mt-6 flex flex-col gap-4 text-xs font-normal text-gray-400 tablet:mt-8 tablet:flex-row tablet:gap-10 tablet:text-md desktop:mt-[60px] desktop:flex-col desktop:gap-4">
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
								<div className="w-[60px]">
									<Form.Label for="city">거주 도시</Form.Label>
								</div>
								<div className="grow">
									<Form.Input.Text id="city" />
								</div>
							</div>
							<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
								<div className="w-[60px]">
									<Form.Label for="mbti">MBTI</Form.Label>
								</div>
								<div className="grow">
									<Form.Input.Text id="mbti" />
								</div>
							</div>
							<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
								<div className="w-[60px]">
									<Form.Label for="job">직업</Form.Label>
								</div>
								<div className="grow">
									<Form.Input.Text id="job" />
								</div>
							</div>
							<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
								<div className="w-[60px]">
									<Form.Label for="sns">SNS 계정</Form.Label>
								</div>
								<div className="grow">
									<Form.Input.Text id="sns" />
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4 text-xs font-normal text-gray-400">
							<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
								<div className="w-[60px]">
									<Form.Label for="birthday">생일</Form.Label>
								</div>
								<div className="grow">
									<Form.Input.Text id="birthday" />
								</div>
							</div>
							<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
								<div className="w-[60px]">
									<Form.Label for="nickname">별명</Form.Label>
								</div>
								<div className="grow">
									<Form.Input.Text id="nickname" />
								</div>
							</div>
							<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
								<div className="w-[60px]">
									<Form.Label for="bloodtype">혈액형</Form.Label>
								</div>
								<div className="grow">
									<Form.Input.Text id="bloodtype" />
								</div>
							</div>
							<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
								<div className="w-[60px]">
									<Form.Label for="nationality">국적</Form.Label>
								</div>
								<div className="grow">
									<Form.Input.Text id="nationality" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Form>
	);
}
