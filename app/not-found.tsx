import Image from "next/image";

export default function NotFound() {
	return (
		<main className="flex h-[calc(100vh-60px)] flex-col items-center justify-center">
			<Image src="/images/not_found.png" width={238} height={288} alt="돋보기 이미지" />
			<p className="mt-6 text-xl">페이지를 찾을 수 없습니다.</p>
		</main>
	);
}
