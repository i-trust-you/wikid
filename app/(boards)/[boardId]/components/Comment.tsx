import Image from "next/image";

import DeleteIcon from "../../../../public/icons/DeleteIcon";
import EditIcon from "../../../../public/icons/EditIcon";
import ProfileImage from "../../../../public/icons/profile.svg";
import { getCommentData } from "../page";
import EmptyState from "./EmptyState";

// TODO:무한 스크롤
const Comment = async ({ articleId }: { articleId: number }) => {
	const commentData = await getCommentData(articleId);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-1 text-lg font-semibold tablet:text-2lg">
				<span className="text-gray-500">댓글</span>
				<span className="text-primary-200">{commentData.length}</span>
			</div>
			{/* // TODO: Form 컴포넌트 */}
			<div>Form</div>
			{commentData.length === 0 ? (
				<div className="m-auto w-[335px] tablet:w-[624px] desktop:w-[1060px]">
					<EmptyState text="작성된 댓글이 없습니다." />
				</div>
			) : (
				<div className="m-auto flex w-[335px] flex-col gap-[14px] tablet:w-[624px] tablet:gap-4 desktop:w-[1060px] desktop:gap-6">
					{commentData.map((comment) => (
						<div
							key={comment.id}
							className="m-auto flex w-[335px] gap-[15px] rounded-[10px] px-5 py-4 shadow-basic tablet:w-[624px] tablet:gap-5 desktop:w-[1060px] desktop:py-[22px]"
						>
							<div className="relative inset-0">
								{comment.writer.image ? (
									<Image src={comment.writer.image} alt="작성자 이미지" className="h-10 w-10 tablet:h-[50px] tablet:w-[50px]" />
								) : (
									<Image src={ProfileImage} alt="작성자 이미지" className="h-10 w-10 tablet:h-[50px] tablet:w-[50px]" />
								)}
							</div>
							<div className="flex w-[240px] flex-col justify-between gap-1 tablet:w-[494px] tablet:gap-[10px] desktop:w-[930px] desktop:gap-5">
								<div className="flex flex-col tablet:gap-[6px]">
									<div className="flex justify-between">
										<h3 className="text-lg font-semibold text-gray-500">{comment.writer.name}</h3>
										<div className="flex gap-[15px] tablet:gap-5">
											{/* TODO: 사이트 크기에 따라 버튼 크기 변경 24 24 20 */}
											<EditIcon width="20" height="20" />
											<DeleteIcon width="20" height="20" />
										</div>
									</div>
									<span className="text-md font-normal text-gray-500">{comment.content}</span>
								</div>
								{/* // TODO: 시간표기 예쁘게 작성하기 */}
								<span className="text-xs font-normal text-gray-400">{comment.createdAt.slice(0, 10)}</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Comment;
