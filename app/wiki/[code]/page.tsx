"use client";

import API from "@/_api";
import Modal from "@/_utilities/Modal";
import Profile from "@/wiki/[code]/_components/Profile";
import ProfileForm from "@/wiki/[code]/_components/ProfileForm";
import QuizModal from "@/wiki/[code]/_components/QuizModal";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import BackLink from "@/_components/common/BackLink";
import Button from "@/_components/common/Button";
import Parser from "@/_components/common/Markdown/parser";
import Scanner from "@/_components/common/Markdown/scanner";

type WikiType = Awaited<ReturnType<(typeof API)["{teamId}/profiles/{code}"]["GET"]>>;

export default function Page() {
	const params = useParams();
	const code = Array.isArray(params.code) ? params.code[0] : params.code;

	const [wiki, setWiki] = useState<WikiType | undefined>();
	const [isEditing, setIsEditing] = useState<boolean>(false);

	useEffect(() => {
		const getWiki = async () => {
			await API["{teamId}/profiles/{code}"].GET({ code: code }).then((response) => {
				setWiki(response);
			});
		};

		if (code) {
			getWiki();
		}
	}, [code]);

	const handleQuizModalSuccess = () => {
		setIsEditing(true);
	};

	const quizModal = useMemo(() => {
		const newModal = new Modal(<QuizModal code={code} question={wiki?.securityQuestion ?? ""} onSuccess={handleQuizModalSuccess} />, (modal) => {
			modal.close();
		});
		return newModal;
	}, [wiki]);

	if (isEditing) {
		return (
			<main className="desktop:pr-[400px]">
				<div className="relative m-auto max-w-[860px] px-5 py-10 tablet:px-[60px] tablet:py-[60px]">
					<div className="mt-3 flex tablet:mt-[15px] desktop:absolute desktop:-right-[320px] desktop:top-0 desktop:mt-10">
						{wiki && (
							<ProfileForm
								profile={wiki}
								onCancle={() => {
									setIsEditing(false);
								}}
							/>
						)}
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="desktop:pr-[400px]">
			<div className="relative m-auto max-w-[860px] px-5 py-10 tablet:px-[60px] tablet:py-[60px]">
				<div className="flex justify-between">
					<h1 className="text-3xl font-semibold text-gray-500 tablet:text-5xl">{wiki?.name}</h1>
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
					{wiki && <Profile profile={wiki} />}
				</div>
				<div className="mt-10 w-full tablet:mt-[60px]">
					{wiki?.content ? (
						<div className="text-gray-500" dangerouslySetInnerHTML={{ __html: Parser.run(Scanner.run(wiki.content)).render() }} />
					) : (
						<div className="flex flex-col items-center justify-center rounded-[10px] bg-gray-100 p-10">
							<p className="text-md font-normal text-gray-400 tablet:text-lg">
								아직 작성된 내용이 없네요.
								<br />
								위키에 참여해 보세요!
							</p>
							<div className="mt-4 tablet:mt-5">
								<Button
									onClick={() => {
										quizModal.open();
									}}
								>
									시작하기
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
