"use client";

import API from "@/_api";
import { formatDateToString } from "@/boards/_utilities/formatDateToString";
import Image from "next/image";
import Link from "next/link";

import HeartIcon from "../../../public/icons/HeartIcon";

type Board = Awaited<ReturnType<(typeof API)["{teamId}/articles"]["GET"]>>["list"][number];

type Props = {
	board: Board;
};

export default function BoardCard({ board }: Props) {
	return (
		<div
			className="flex max-w-[250px] shrink-0 flex-col rounded-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] tablet:w-full tablet:max-w-full desktop:w-min desktop:flex-1 desktop:grow"
			draggable={false}
		>
			<Link href={`/boards/${board.id}`} draggable={false}>
				<Image
					src={board.image ?? "/images/not_found.png"}
					width={250}
					height={130}
					alt="게시물 이미지"
					className="h-[130px] min-w-[250px] rounded-t-[10px] object-cover tablet:w-full"
					draggable={false}
				/>
				<div className="flex flex-col px-5 py-[14px]">
					<h3 className="truncate text-lg font-semibold text-gray-500 tablet:text-2lg">{board.title}</h3>
					<div className="flex items-center justify-between text-xs font-normal text-gray-400 tablet:text-md">
						<div className="flex items-center">
							<p>{board.writer.name}</p>
							<p className="ml-2">{formatDateToString(new Date(board.createdAt))}</p>
						</div>
						<div className="flex items-center">
							<HeartIcon width={16} height={16} />
							<p className="ml-1">{board.likeCount}</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
