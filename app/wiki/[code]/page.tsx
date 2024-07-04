"use client";

import API from "@/_api";
import Modal from "@/_utilities/Modal";
import Profile from "@/wiki/[code]/_components/Profile";
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

	useEffect(() => {
		const getWiki = async () => {
			await API["{teamId}/profiles/{code}"].GET({ code: code }).then((response) => {
				setWiki(response);
				console.log(response);
			});
		};

		if (code) {
			getWiki();
		}
	}, [code]);

	const quizModal = useMemo(() => {
		const newModal = new Modal(<QuizModal code={code} question={wiki?.securityQuestion ?? ""} />, (modal) => {
			modal.close();
		});
		return newModal;
	}, [wiki]);

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
				{wiki && (
					<div className="mt-10 w-full text-gray-500 tablet:mt-[60px]" dangerouslySetInnerHTML={{ __html: Parser.run(Scanner.run(wiki.content)).parse() }} />
				)}
			</div>
		</main>
	);
}
