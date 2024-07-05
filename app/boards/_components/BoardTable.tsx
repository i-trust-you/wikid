"use client";

import API from "@/_api";
import { formatDateToString } from "@/boards/_utilities/formatDateToString";
import { useRouter } from "next/navigation";

type BoardType = Awaited<ReturnType<(typeof API)["{teamId}/articles"]["GET"]>>["list"][number];

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
				<thead className="w-full border-b text-lg font-normal text-gray-400">
					<tr className="h-[50px]">
						<th className="w-2/12">번호</th>
						<th className="w-4/12">제목</th>
						<th className="w-2/12">작성자</th>
						<th className="w-2/12">좋아요</th>
						<th className="w-2/12">날짜</th>
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
							<td className="text-left group-hover:font-semibold group-hover:text-primary-300 group-hover:underline">{board.title}</td>
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
