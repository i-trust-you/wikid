"use client";

import Swiper from "@/_components/general/Swiper";

export default function Page() {
	return (
		<main className="flex h-screen w-screen items-center justify-center">
			<div className="h-[250px] w-[500px]">
				<Swiper gap={10} columns={4} sensitivity={0.45}>
					{new Array(7).fill(null).map((_, index) => (
						<div key={index} className="flex items-center justify-center rounded-[10px] bg-gray-300 select-none">
							{index}
						</div>
					))}
				</Swiper>
			</div>
		</main>
	);
}
