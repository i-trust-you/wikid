"use client";

import API from "@/_api";
import Modal from "@/_utilities/Modal";
import EditProfile from "@/wiki/[code]/_components/EditProfile";
import Profile from "@/wiki/[code]/_components/Profile";
import QuizModal from "@/wiki/[code]/_components/QuizModal";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import BackLink from "@/_components/common/BackLink";
import Button from "@/_components/common/Button";
import Markdown from "@/_components/common/Markdown";
import Parser from "@/_components/common/Markdown/parser";
import Scanner from "@/_components/common/Markdown/scanner";

type WikiType = Awaited<ReturnType<(typeof API)["{teamId}/profiles/{code}"]["GET"]>>;
type ProfileType = Omit<Awaited<Parameters<(typeof API)["{teamId}/profiles/{code}"]["PATCH"]>[1]>, "securityAnswer" | "securityQuestion">;

export default function Page() {
	const params = useParams();
	const code = Array.isArray(params.code) ? params.code[0] : params.code;

	const [wiki, setWiki] = useState<WikiType | undefined>();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isMe, setIsMe] = useState<boolean>();

	const [formData, setFormData] = useState<ProfileType | undefined>();
	const [imageFile, setImageFile] = useState<File>();

	const handleSubmit = async () => {
		const imageString = imageFile ? await API["{teamId}/images/upload"].POST({}, imageFile).then((response) => response.url) : null;

		if (formData) {
			await setFormData((prev) => ({ ...prev, image: imageString }));
			await API["{teamId}/profiles/{code}"].PATCH({ code }, formData);
			window.location.reload();
		}
	};

	useEffect(() => {
		const getWiki = async () => {
			await API["{teamId}/profiles/{code}"].GET({ code }).then((response) => {
				setWiki(response);
				setFormData({
					birthday: response.birthday,
					bloodType: response.bloodType,
					city: response.city,
					content: response.content,
					family: response.family,
					image: response.image,
					mbti: response.mbti,
					nationality: response.nationality,
					nickname: response.nickname,
					sns: response.sns,
					job: response.job,
				});
			});
			await API["{teamId}/users/me"].GET({}).then((response) => {
				setIsMe(code === response.profile.code);
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

	if (!wiki) return null;

	if (isEditing) {
		return (
			<main className="desktop:pr-[400px]">
				<div className="relative m-auto max-w-[860px] px-5 py-10 tablet:px-[60px] tablet:py-10">
					<div className="flex w-full items-center justify-between rounded-[10px] bg-gray-100 px-5 py-[10px] desktop:px-[30px]">
						<h1 className="text-xl font-semibold text-gray-500">{wiki.name}</h1>
						<div className="flex gap-[10px]">
							<div className="h-10 w-[70px]">
								<Button
									style="outline"
									onClick={() => {
										setIsEditing(false);
									}}
								>
									취소
								</Button>
							</div>
							<div className="h-10 w-[70px]">
								<Button onClick={handleSubmit}>저장</Button>
							</div>
						</div>
					</div>
					<div className="mt-3 flex tablet:mt-[15px] desktop:absolute desktop:-right-[320px] desktop:top-0 desktop:mt-10 desktop:pb-10">
						{!isMe ? (
							<Profile profile={wiki} />
						) : (
							formData && (
								<EditProfile
									setProfile={setFormData as React.Dispatch<React.SetStateAction<ProfileType>>}
									profile={formData}
									setImageFile={setImageFile as React.Dispatch<React.SetStateAction<File>>}
								/>
							)
						)}
					</div>
					<div className="mt-[15px] flex flex-col">
						<Markdown />
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
					<BackLink code={code} />
				</div>
				<div className="mt-3 flex tablet:mt-[15px] desktop:absolute desktop:-right-[320px] desktop:top-0 desktop:mt-10 desktop:pb-10">
					<Profile profile={wiki} />
				</div>
				<div className="mt-10 w-full tablet:mt-[60px]">
					{wiki.content ? (
						<div className="text-gray-500" dangerouslySetInnerHTML={{ __html: Parser.run(Scanner.run(wiki.content)).parse() }} />
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
