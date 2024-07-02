"use client";

import API from "@/_api";
import BoardCard from "@/boards/_components/BoardCard";
import BoardDropdown from "@/boards/_components/BoardDropdown";
import BoardList from "@/boards/_components/BoardList";
import BoardTable from "@/boards/_components/BoardTable";
import SearchForm from "@/boards/_components/SearchForm";
import { useCallback, useEffect, useState } from "react";

import useMediaQuery from "@/_hooks/useMediaQuery";

import Button from "@/_components/common/Button";
import Pagination from "@/_components/general/Pagination";

type Board = Awaited<ReturnType<(typeof API)["{teamId}/articles"]["GET"]>>["list"][number];
type Order = "recent" | "like";

export default function Page() {
	const isLargeScreen = useMediaQuery("(min-width: 768px)");
	const [bestBoards, setBestBoards] = useState<Board[]>([]);
	const [allBoards, setAllBoards] = useState<Board[]>([]);
	const [order, setOrder] = useState<Order>("recent");
	const [page, setPage] = useState(1);

	useEffect(() => {
		const getBestBoards = async () => {
			await API["{teamId}/articles"].GET({ teamId: "6-16", page: 1, pageSize: 4, orderBy: "like" }).then((response) => {
				setBestBoards(response.list);
			});
		};

		getBestBoards();
	}, []);

	const getAllBoards = useCallback(async (page: number, orderBy: Order, keyword?: string) => {
		await API["{teamId}/articles"].GET({ teamId: "6-16", page, pageSize: 10, orderBy, keyword }).then((response) => {
			setAllBoards(response.list);
		});
	}, []);

	const handleFormClick = (value: string) => {
		getAllBoards(page, order, value);
	};

	useEffect(() => {
		getAllBoards(page, order);
	}, [order]);

	const options = [
		{
			value: "recent",
			content: "최신순",
		},
		{
			value: "like",
			content: "좋아요순",
		},
	];

	const handleDropdownClick = (value: string) => {
		setOrder(value as Order);
	};

	return (
		<main className="px-5 py-10 tablet:px-[60px] tablet:py-[60px]">
			<section className="mx-auto max-w-[1200px]">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-semibold text-gray-500 tablet:text-3xl">베스트 게시글</h2>
					<div className="h-[45px] w-[130px] tablet:w-[160px]">
						<Button href="/addboard">게시물 등록하기</Button>
					</div>
				</div>
				<div className="mt-10 flex items-start gap-4 tablet:mt-[60px] tablet:grid tablet:grid-cols-2 tablet:gap-5 desktop:flex">
					{bestBoards.map((board) => (
						<BoardCard
							key={board.id}
							id={board.id}
							title={board.title}
							image={board.image}
							writerName={board.writer.name}
							createdAt={new Date(board.createdAt)}
							likeCount={board.likeCount}
						/>
					))}
				</div>
			</section>
			<section className="mx-auto mt-10 flex max-w-[1200px] flex-col tablet:mt-[60px]">
				<div className="flex flex-col tablet:flex-row">
					<div className="grow">
						<SearchForm onSubmit={handleFormClick} />
					</div>
					<div className="mt-5 w-full tablet:ml-5 tablet:mt-0 tablet:w-[120px] desktop:w-[140px]">
						<BoardDropdown options={options} onSelect={handleDropdownClick} />
					</div>
				</div>
				<div className="mt-5">{isLargeScreen ? <BoardTable boards={allBoards} /> : <BoardList boards={allBoards} />}</div>
				<div className="mt-8 flex items-center justify-center tablet:mt-[60px]">
					<Pagination page={page} clamp={5} length={5} />
				</div>
			</section>
		</main>
	);
}
