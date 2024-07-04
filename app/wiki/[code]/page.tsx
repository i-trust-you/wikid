"use client";

import Modal from "@/_utilities/Modal";
import Profile from "@/wiki/[code]/_components/Profile";
import QuizModal from "@/wiki/[code]/_components/QuizModal";
import { useMemo } from "react";

import BackLink from "@/_components/common/BackLink";
import Button from "@/_components/common/Button";

export default function Page() {
	const quizModal = useMemo(
		() =>
			new Modal(<QuizModal code="456" question="안녕" />, (modal) => {
				modal.close();
			}),
		[],
	);

	const test = {
		image: null,
		city: "전주",
		mbti: "ESFJ",
		job: "home protector",
		sns: "heony704",
		birthday: "1997-07-04",
		nickname: "허니",
		bloodType: "A",
		nationality: "한국",
	};

	return (
		<main className="desktop:pr-[400px]">
			<div className="relative m-auto max-w-[860px] px-5 py-10 tablet:px-[60px] tablet:py-[60px]">
				<div className="flex justify-between">
					<h1 className="text-3xl font-semibold text-gray-500 tablet:text-5xl">이승헌</h1>
					<div className="w-[120px] tablet:w-[160px]">
						<Button
							onClick={() => {
								quizModal.open();
							}}
						>
							위키 참여하기
						</Button>
					</div>
				</div>
				<div className="mt-6 tablet:mt-8">
					<BackLink>https://dkjfaklfd</BackLink>
				</div>
				<div className="mt-3 flex tablet:mt-[15px] desktop:absolute desktop:-right-[320px] desktop:top-0 desktop:mt-10">
					<Profile profile={test} />
				</div>
				<div className="mt-10 tablet:mt-[60px]">개요</div>
			</div>
		</main>
	);
}
