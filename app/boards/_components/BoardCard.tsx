"use client";

import { formatDateToString } from "@/boards/_utilities/formatDateToString";
import Image from "next/image";
import Link from "next/link";

import HeartIcon from "../../../public/icons/HeartIcon";

type BoardCardProps = {
	id: number;
	title: string;
	image: string | null;
	writerName: string;
	createdAt: Date;
	likeCount: number;
};

export default function BoardCard({ id, title, image, writerName, createdAt, likeCount }: BoardCardProps) {
	return (
		<div className="flex w-[250px] shrink-0 flex-col overflow-hidden rounded-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] tablet:w-full desktop:w-min desktop:flex-1 desktop:grow">
			<Link href={`/boards/${id}`}>
				<Image
					src={image ?? "/images/not_found.png"}
					width={250}
					height={130}
					alt="게시물 이미지"
					className="h-[130px] min-w-[250px] object-cover tablet:w-full"
				/>
				<div className="flex flex-col px-5 py-[14px]">
					<h3 className="truncate text-lg font-semibold text-gray-500 tablet:text-2lg">{title}</h3>
					<div className="flex items-center justify-between text-xs font-normal text-gray-400 tablet:text-md">
						<div className="flex items-center">
							<p>{writerName}</p>
							<p className="ml-2">{formatDateToString(createdAt)}</p>
						</div>
						<div className="flex items-center">
							<HeartIcon width="16" height="16" />
							<p className="ml-1">{likeCount}</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
