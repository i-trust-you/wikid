"use client";

import Modal from "@/_utilities/Modal";
import { useMemo } from "react";

export default function Page() {
	const modal = useMemo(
		() =>
			new Modal(
				(
					<>
						<div className="text-2lg font-semibold text-gray-500">5분 이상 글을 쓰지 않아 접속이 끊어졌어요.</div>
						<div className="mt-[10px] text-lg font-normal text-gray-400">위키 참여하기를 통해 다시 위키를 수정해 주세요.</div>
						<div className="mt-[33px] flex flex-row-reverse">
							<button className="text-white rounded-[10px] bg-primary-200 px-[20px] py-[8px] text-md font-semibold" onClick={() => Modal.close()}>
								확인
							</button>
						</div>
					</>
				),
				(modal) => {
					modal.shake();
				},
			),
		[],
	);

	return (
		<main>
			<button onClick={() => modal.open()}>모달 열기</button>
			<hr></hr>
			<button onClick={() => modal.close()}>모달 닫기</button>
		</main>
	);
}
