"use client";

import API from "@/_api";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

import Button from "@/_components/common/Button";
import Parser from "@/_components/common/Markdown/parser";
import Scanner from "@/_components/common/Markdown/scanner";

import HeartIcon from "../../../../public/icons/HeartIcon";

type ArticleDetailType = Awaited<ReturnType<(typeof API)["{teamId}/articles/{articleId}"]["GET"]>>;

export default function Article({ articleId }: { articleId: number }) {
	const router = useRouter();
	const [article, setArticle] = useState<ArticleDetailType>(null as never as ArticleDetailType);

	useEffect(() => {
		async function getCurrentArticle(articleId: number) {
			API["{teamId}/articles/{articleId}"].GET({ teamId: "6-11", articleId }).then((value) => setArticle(value));
		}
		getCurrentArticle(articleId);
	}, [articleId]);

	const editArticle: MouseEventHandler = () => {
		router.push("/"); // TODO: 여기에 수정페이지 링크 입력
	};

	const deleteArticle: MouseEventHandler = () => {
		API["{teamId}/articles/{articleId}"]
			.DELETE({ teamId: "6-11", articleId })
			.then(() => {
				router.push("/boards");
			})
			.catch((err) => console.log(err));
	};

	const likeArticle: MouseEventHandler = () => {
		API["{teamId}/articles/{articleId}/like"]
			.POST({ teamId: "6-11", articleId })
			.then(() => router.refresh())
			.catch();
	};

	const getFormattedDateFromDateString = (dateString: string) =>
		new Date(dateString).toLocaleString("ko-KR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});

	return (
		<div className="w-[335px] rounded-[10px] py-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] tablet:w-[624px] tablet:py-10 desktop:w-[1060px]">
			{article && (
				<div className="m-auto flex w-[295px] flex-col tablet:w-[564px] tablet:gap-3 desktop:w-[1000px]">
					<div className="flex flex-col justify-between gap-[14px]">
						<div className="flex justify-between">
							<h1 className="text-2xl font-semibold text-gray-500 tablet:text-3xl">{article.title}</h1>
							<div className="flex gap-3 desktop:gap-[14px]">
								{/* // TODO: 모바일 일때는 이미지로 변경 - 편집: 22, 삭제: 24*/}
								{/* // TODO: 게시글의 소유자일때에만 버튼을 활성화 */}
								<div className="invisible tablet:visible tablet:h-[45px] tablet:w-[120px] desktop:w-[140px]">
									<Button disabled={true} onClick={editArticle}>
										수정하기
									</Button>
								</div>
								<div className="invisible tablet:visible tablet:h-[45px] tablet:w-[120px] desktop:w-[140px]">
									<Button disabled={true} onClick={deleteArticle}>
										삭제하기
									</Button>
								</div>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex gap-[10px] text-xs text-gray-400 tablet:text-md">
								<span>{article.writer.name}</span>
								<span>{getFormattedDateFromDateString(article.createdAt)}</span>
							</div>
							<div className="flex h-[18px] items-center gap-1 text-xs font-normal text-gray-400 tablet:h-6 tablet:text-md" onClick={likeArticle}>
								{/* // TODO: 이미지가 일그러짐, 기기 크기에 따른 사이즈 변화 필요 */}
								<HeartIcon height={16} width={16} />
								<span>{article.likeCount}</span>
							</div>
						</div>
					</div>
					{/* // ISSUE: 테스트 케이스 내의 이미지가 제대로 나오지 않습니다.
                    <Image src={article.image} width={500} height={300} alt="게시글 사진" />
                    */}
					<div
						className="text-md font-normal text-gray-500 tablet:text-lg"
						dangerouslySetInnerHTML={{ __html: article.content && Parser.run(Scanner.run(article.content)).render() }}
					/>
				</div>
			)}
		</div>
	);
}
