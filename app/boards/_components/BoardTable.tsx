"use client";

import { formatDateToString } from "@/boards/_utilities/formatDateToString";
import { useRouter } from "next/navigation";

type BoardType = {
	id: number;
	title: string;
	image: string | null;
	writer: {
		name: string;
		id: number;
	};
	likeCount: number;
	createdAt: string;
	updatedAt: string;
};

type BoardTableProps = {
	boards: BoardType[];
};

export default function BoardTable({ boards }: BoardTableProps) {
	const router = useRouter();

	const handleClick = (id: number) => {
		router.push(`/boards/${id}`);
	};

	return (
		<>
			<table className="w-full table-auto border-collapse border-t border-gray-200">
				<thead className="border-b text-lg font-normal text-gray-400">
					<tr className="h-[50px]">
						<th>번호</th>
						<th>제목</th>
						<th>작성자</th>
						<th>좋아요</th>
						<th>날짜</th>
					</tr>
				</thead>
				<tbody>
					{boards.map((board) => (
						<tr
							className="group h-[50px] cursor-pointer border-b text-center text-lg font-normal text-gray-500"
							onClick={() => {
								handleClick(board.id);
							}}
							key={board.id}
						>
							<td>{board.id}</td>
							<td className="pl-6 text-left group-hover:font-semibold group-hover:underline">{board.title}</td>
							<td>{board.writer.name}</td>
							<td>{board.likeCount}</td>
							<td>{formatDateToString(new Date(board.createdAt))}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
