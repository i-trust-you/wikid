import API from "@/_api";
import Image from "next/image";
import { useState } from "react";



import CheckIcon from "../../../../public/icons/CheckIcon";
import DeleteIcon from "../../../../public/icons/DeleteIcon";
import EditIcon from "../../../../public/icons/EditIcon";
import ProfileImage from "../../../../public/icons/profile.svg";


type CommentType = Awaited<ReturnType<(typeof API)["{teamId}/articles/{articleId}/comments"]["GET"]>>["list"][0];

export default function Comment({ comment }: Readonly<{ comment: CommentType }>) {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [value, setValue] = useState<string>(comment.content);

	const handleEditButtonClick = async () => {
		await API["{teamId}/comments/{commentId}"].PATCH({ commentId: comment.id }, { content: value });
		window.location.reload();

	};

	const handleDeleteButtonClick = async () => {
		await API["{teamId}/comments/{commentId}"].DELETE({ commentId: comment.id });
		window.location.reload();
	};

	return (
		<div
			key={comment.id}
			className="m-auto flex w-[335px] gap-[15px] rounded-[10px] px-5 py-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] tablet:w-[624px] tablet:gap-5 desktop:w-[1060px] desktop:py-[22px]"
		>
			<div className="relative inset-0">
				<Image
					src={comment.writer.image ?? ProfileImage}
					height={50}
					width={50}
					alt="작성자 이미지"
					className="h-10 w-10 rounded-full tablet:h-[50px] tablet:w-[50px]"
				/>
			</div>
			<div className="flex w-[240px] grow flex-col justify-between gap-1 tablet:w-[494px] tablet:gap-[10px] desktop:w-[930px] desktop:gap-5">
				<div className="flex flex-col tablet:gap-[6px]">
					<div className="flex justify-between">
						<h3 className="text-lg font-semibold text-gray-500">{comment.writer.name}</h3>
						<div className="flex gap-2 tablet:gap-3">
							<button
								className="trnasition flex rounded-[10px] px-1 py-1 hover:bg-gray-100 active:bg-gray-200"
								onClick={() => {
									setIsEditing(true);
								}}
							>
								<div className="hidden tablet:block">
									<EditIcon width={24} height={24} />
								</div>
								<div className="block tablet:hidden">
									<EditIcon width={20} height={20} />
								</div>
							</button>
							{isEditing ? (
								<button className="flex rounded-[10px] px-1 py-1 transition hover:bg-gray-100 active:bg-gray-200" onClick={handleEditButtonClick}>
									<div className="hidden tablet:block">
										<CheckIcon width={24} height={24} />
									</div>
									<div className="block tablet:hidden">
										<CheckIcon width={20} height={20} />
									</div>
								</button>
							) : (
								<button className="flex rounded-[10px] px-1 py-1 transition hover:bg-gray-100 active:bg-gray-200" onClick={handleDeleteButtonClick}>
									<div className="hidden tablet:block">
										<DeleteIcon width={24} height={24} />
									</div>
									<div className="block tablet:hidden">
										<DeleteIcon width={20} height={20} />
									</div>
								</button>
							)}
						</div>
					</div>
					{isEditing ? (
						<textarea className="resize-none rounded-[10px] bg-gray-100 px-2 py-1" value={value} onChange={(e) => setValue(e.target.value)} />
					) : (
						<p className="text-md font-normal text-gray-500">{comment.content}</p>
					)}
				</div>
				<span className="text-xs font-normal text-gray-400">{comment.createdAt.slice(0, 10)}</span>
			</div>
		</div>
	);
}