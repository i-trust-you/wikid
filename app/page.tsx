"use client";

import { useState } from "react";

import Pagination from "@/_components/general/Pagination";

export default function Page() {
	const [page, setPage] = useState(0);

	return (
		<main className="flex h-screen w-screen flex-col items-center justify-center gap-[25px]">
			<button onClick={() => setPage((_) => _ + 1)}>클릭! {page}</button>
			<Pagination page={page} clamp={10} length={25} onChange={(_) => setPage(_)} />
			<hr />
			<Pagination page={page} clamp={10} length={100} onChange={(_) => setPage(_)}>
				<div className="flex gap-[10px]">
					<Pagination.Generator>
						{(page) => (
							<Pagination.Jump key={page} to={page}>
								<div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-primary-300">{page + 1}</div>
							</Pagination.Jump>
						)}
					</Pagination.Generator>
				</div>
			</Pagination>
		</main>
	);
}
