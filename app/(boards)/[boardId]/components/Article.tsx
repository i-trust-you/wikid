import Image from "next/image";

import Button from "@/_components/common/Button";

import HeartIcon from "../../../../public/icons/HeartIcon";
import { getArticleData } from "../page";

const Article = async ({ articleId }: { articleId: number }) => {
	const articleData = await getArticleData(articleId);
	const date: Date = new Date(articleData.createdAt);
	const formattedDate: string = date.toLocaleString("ko-KR", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

	return (
		<div className="w-[335px] rounded-[10px] py-5 shadow-basic tablet:w-[624px] tablet:py-10 desktop:w-[1060px]">
			<div className="m-auto flex w-[295px] flex-col tablet:w-[564px] tablet:gap-3 desktop:w-[1000px]">
				<div className="flex flex-col justify-between gap-[14px]">
					<div className="flex justify-between">
						<h1 className="text-2xl font-semibold text-gray-500 tablet:text-3xl">{articleData.title}</h1>
						<div className="flex gap-3 desktop:gap-[14px]">
							{/* // TODO: 모바일 일때는 이미지로 변경 - 편집: 22, 삭제: 24*/}
							<div className="tablet:h-[45px] tablet:w-[120px] desktop:w-[140px]">
								<Button>수정하기</Button>
							</div>
							<div className="tablet:h-[45px] tablet:w-[120px] desktop:w-[140px]">
								<Button>삭제하기</Button>
							</div>
						</div>
					</div>
					<div className="flex justify-between">
						<div className="flex gap-[10px] text-xs text-gray-400 tablet:text-md">
							<span>{articleData.writer.name}</span>
							<span>{formattedDate}</span>
						</div>
						<div className="flex h-[18px] items-center gap-1 text-xs font-normal text-gray-400 tablet:h-6 tablet:text-md">
							{/* // TODO: 이미지가 일그러짐, 기기 크기에 따른 사이즈 변화 필요, 클릭시 카운트 업  */}
							<HeartIcon height="16" width="16" />
							<span>{articleData.likeCount}</span>
						</div>
					</div>
				</div>
				<Image src={articleData.image} width={500} height={300} alt="게시글 사진" />
				<div className="text-md font-normal text-gray-500 tablet:text-lg">{articleData.content}</div>
			</div>
		</div>
	);
};

export default Article;
