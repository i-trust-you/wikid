import { CommentType } from "@/_api";
import Image from "next/image";

import DeleteIcon from "../../../../public/icons/DeleteIcon";
import EditIcon from "../../../../public/icons/EditIcon";
import ProfileImage from "../../../../public/icons/profile.svg";

export default function Comment({ comment }: Readonly<{ comment: CommentType }>) {
	return (
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
							<button>
								<EditIcon width="20" height="20" />
							</button>
							<button>
								<DeleteIcon width="20" height="20" />
							</button>
						</div>
					</div>
					<span className="text-md font-normal text-gray-500">{comment.content}</span>
				</div>
				{/* // TODO: 시간표기 예쁘게 작성하기 */}
				<span className="text-xs font-normal text-gray-400">{comment.createdAt.slice(0, 10)}</span>
			</div>
		</div>
	);
}
