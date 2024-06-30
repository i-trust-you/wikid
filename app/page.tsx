"use client";

import { Notification } from "@/_utilities/Notification";

export default function Page() {
	return (
		<main className="flex h-screen w-screen flex-col items-center justify-center gap-[10px]">
			<div className="flex gap-[10px]">
				<button
					className="rounded-[10px] border border-primary-200 px-[10px] shadow-lg"
					onClick={() => Notification.write({ id: Math.floor(Math.random() * 100), content: "알림이에요" })}
				>
					알림 추가
				</button>
				<button className="rounded-[10px] border border-primary-200 px-[10px] shadow-lg" onClick={() => Notification.open()}>
					알림 열기
				</button>
				<button className="rounded-[10px] border border-primary-200 px-[10px] shadow-lg" onClick={() => Notification.close()}>
					알림 닫기
				</button>
			</div>
		</main>
	);
}
