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
import Swiper from "@/_components/general/Swiper";

type Board = Awaited<ReturnType<(typeof API)["{teamId}/articles"]["GET"]>>["list"][number];
type Order = "recent" | "like";

export default function Page() {
	const isLargeScreen = useMediaQuery("(min-width: 768px)");
	const [bestBoards, setBestBoards] = useState<Board[]>([]);
	const [allBoards, setAllBoards] = useState<Board[]>([]);
	const [order, setOrder] = useState<Order>("recent");
	const [page, setPage] = useState<number>(1);
	const [totalBoards, setTotalBoards] = useState<number>(0);

	useEffect(() => {
		const getBestBoards = async () => {
			await API["{teamId}/articles"].GET({ teamId: "6-11", page: 1, pageSize: 4, orderBy: "like" }).then((response) => {
				setBestBoards(response.list);
			});
		};

		getBestBoards();
	}, []);

	const getAllBoards = useCallback(async (page: number, orderBy: Order, keyword?: string) => {
		await API["{teamId}/articles"].GET({ teamId: "6-11", page, pageSize: 10, orderBy, keyword }).then((response) => {
			setAllBoards(response.list);
			setTotalBoards(response.totalCount);
		});
	}, []);

	const handleFormClick = (value: string) => {
		setPage(1);
		getAllBoards(1, order, value);
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

	const handlePagination = (page: number) => {
		setPage(page + 1);
	};

	useEffect(() => {
		getAllBoards(page, order);
	}, [page]);

	// return (
	// 	<main className="flex h-screen w-screen items-center justify-center">
	// 		<div className="h-[250px] w-[500px]">
	// 			<Swiper gap={16} columns={2} threshold={1}>
	// 				{bestBoards.map((board) => (
	// 					<BoardCard key={board.id} board={board} />
	// 				))}
	// 			</Swiper>
	// 		</div>
	// 	</main>
	// );

	return (
		<main className="px-5 py-10 tablet:px-[60px] tablet:py-[60px]">
			<section className="mx-auto max-w-[1200px]">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-semibold text-gray-500 tablet:text-3xl">베스트 게시글</h2>
					<div className="h-[45px] w-[130px] tablet:w-[160px]">
						<Button href="/addboard">게시물 등록하기</Button>
					</div>
				</div>
				<div className="mt-10">
					{isLargeScreen ? (
						<div className="flex items-start gap-4 tablet:mt-[60px] tablet:grid tablet:grid-cols-2 tablet:gap-5 desktop:flex">
							{bestBoards.map((board) => (
								<BoardCard key={board.id} board={board} />
							))}
						</div>
					) : (
						<div className="overflow-y-visible">
							<Swiper gap={16} columns={2} threshold={1}>
								{bestBoards.map((board) => (
									<BoardCard key={board.id} board={board} />
								))}
							</Swiper>
						</div>
					)}
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
					<Pagination page={page - 1} clamp={5} length={Math.ceil(totalBoards / 10)} onChange={handlePagination} />
				</div>
			</section>
		</main>
	);
}
