import API from "@/_api";
import { formatDateToString } from "@/boards/_utilities/formatDateToString";
import Link from "next/link";

import HeartIcon from "../../../public/icons/HeartIcon";

type BoardType = Awaited<ReturnType<(typeof API)["{teamId}/articles"]["GET"]>>["list"][number];

type BoardListProps = {
	boards: BoardType[];
};

export default function BoardList({ boards }: BoardListProps) {
	return (
		<div className="flex flex-col">
			{boards.map((board) => (
				<div key={board.id}>
					<Board id={board.id} title={board.title} writerName={board.writer.name} createdAt={new Date(board.createdAt)} likeCount={board.likeCount} />
					<hr className="text-gray-200" />
				</div>
			))}
		</div>
	);
}

type BoardProps = {
	id: number;
	title: string;
	writerName: string;
	createdAt: Date;
	likeCount: number;
};

function Board({ id, title, writerName, createdAt, likeCount }: BoardProps) {
	return (
		<Link href={`/boards/${id}`}>
			<div className="flex flex-col py-3">
				<h3 className="text-lg font-normal text-gray-500">{title}</h3>
				<div className="flex items-center justify-between text-lg font-normal text-gray-400">
					<div className="flex items-center">
						<p>{writerName}</p>
						<p className="ml-4">{formatDateToString(createdAt)}</p>
					</div>
					<div className="flex items-center">
						<HeartIcon width="18" height="18" />
						<p className="ml-1">{likeCount}</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
