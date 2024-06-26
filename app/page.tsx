"use client";

import Pagination from "@/_components/general/Pagination";

export default function Page() {
	return (
		<main className="flex h-screen w-screen flex-col items-center justify-center gap-[25px]">
			<Pagination page={0} clamp={10} length={25} />
			<hr />
			<Pagination page={0} clamp={10} length={100}>
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
