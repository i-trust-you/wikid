"use client";

import Toast from "@/_utilities/Toast";

export default function Page() {
	return (
		<main className="flex h-screen w-screen flex-col items-center justify-center gap-[10px]">
			<div className="flex gap-[10px]">
				<button
					className="rounded-[10px] border border-purple px-[10px] shadow-lg"
					onClick={() => Toast.info("미안하다 이거 보여주려고 어그로끌었다 .. 나루토 사스케 싸움수준 ㄹㅇ실화냐? ")}
				>
					info
				</button>
				<button
					className="rounded-[10px] border border-red-200 px-[10px] shadow-lg"
					onClick={() => Toast.error("와 샌즈! 언더테일 아시는구나! 혹시 모르시는분들에 대해 설명해드립니다")}
				>
					error
				</button>
				<button
					className="rounded-[10px] border border-yellow px-[10px] shadow-lg"
					onClick={() => Toast.warning("소... 솔직히 함수형 호출은 별로라고 생각해요...")}
				>
					warning
				</button>
				<button
					className="rounded-[10px] border border-primary-200 px-[10px] shadow-lg"
					onClick={() => Toast.success("그래, 모든 것은 운명석의 문의 선택대로. 엘 프사이 콩그루.")}
				>
					success
				</button>
			</div>
		</main>
	);
}
