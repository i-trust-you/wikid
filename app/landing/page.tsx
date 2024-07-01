"use client";

import Image from "next/image";
import Link from "next/link";

import "./font.css";

export default function landing() {
	const titleStyle =
		"font-title mt-[10px] text-[16px] leading-[18.4px] tablet:text-[32px] tablet:leading-[36.8px] desktop:mt-[20px] desktop:text-[50px] desktop:leading-[57px] flex";
	const subTitleStyle = "font-title text-[10px] font-bold text-primary-200 tablet:text-[20px] desktop:text-[30px]";
	const container = "tablet:w-[647px] desktop:w-[924px] w-[335px] mx-auto";

	//애니메이션 이미지
	const Images = [
		{ src: "/images/speaker.svg", alt: "스피커 이미지", bgColor: "#B2A5FD" },
		{ src: "/images/logo.svg", alt: "로고 이미지", bgColor: "#ADEDDE" },
		{ src: "/images/phone.svg", alt: "휴대폰 이미지", bgColor: "#DEE5F5" },
		{ src: "/images/bubbles.svg", alt: "말풍선 이미지", bgColor: "#DEE5F5" },
	];

	return (
		<>
			<header className="z-10 mb-[-134px] flex flex-col bg-[#F1F4FD] pt-[160px] text-center tablet:mb-[-323px] tablet:pt-[180px] desktop:mb-[-252px] desktop:pt-[200px]">
				<span className="font-title flex-row items-center text-[40px] leading-[15px] tablet:text-[60px]">남들이 만드는</span>
				<span className="font-title mt-[15px] text-[60px] font-bold tablet:text-[90px]">나만의 위키</span>
				<Link href="" className="m-[0_auto] block w-max rounded-[15px] bg-gray-500 p-[15px_30px] text-[20px] font-bold text-white tablet:text-[24px]">
					위키 만들기
				</Link>
				<div className="relative mx-auto mt-[44px] h-[398px] w-[336px] tablet:h-[590px] tablet:w-[498px]">
					<Image src="/images/profile.svg" layout="fill" objectFit="contain" alt="프로필 이미지" />
				</div>
			</header>
			<main className="flex w-full flex-col items-center overflow-hidden bg-[#F1F4FD]">
				<section className="h-[714px] w-[800px] rounded-t-[900px_150px] bg-gray-500 pt-[364px] tablet:h-[1059px] tablet:w-[1200px] tablet:pt-[531px] desktop:h-[1412px] desktop:w-[2000px]">
					<div className={`flex gap-[10px] tablet:gap-[20px] desktop:gap-[40px] ${container}`}>
						<div className="flex flex-1 flex-col items-start">
							<span className={subTitleStyle}>WRITE</span>
							<p className={`${titleStyle} items-start text-white`}>
								친구의 위키,
								<br /> 직접 작성해 봐요
							</p>
							<div className="relative mt-[30px] w-full flex-grow rounded-[10px] bg-primary-200 tablet:mt-[40px] tablet:rounded-[15px] desktop:rounded-[20px]">
								<Image src="/images/keyboard.svg" layout="fill" objectFit="contain" alt="키보드 이미지" />
							</div>
						</div>
						<div className="h-[250px] w-[192px] shrink-0 tablet:h-[479px] tablet:w-[365px] desktop:h-[681px] desktop:w-[520px]">
							<Image src="/images/promotion.svg" alt="프로모션 이미지" />
						</div>
					</div>
				</section>
				<section className="relative h-[374px] w-full overflow-hidden bg-white tablet:h-[676px] desktop:h-[1051px]">
					<div className={`flex flex-col items-end ${container} mt-[100px] tablet:mt-[160px] desktop:mt-[200px]`}>
						<span className={subTitleStyle}>SHARE</span>
						<p className={`${titleStyle} text-right text-gray-500`}>
							내 위키 만들고 <br /> 친구에게 공유해요
						</p>
					</div>
					<div
						className="absolute top-[198px] flex gap-[10px] whitespace-nowrap tablet:top-[369px] tablet:gap-[20px] desktop:top-[491px] desktop:gap-[70px]"
						style={{ animation: "scrollLeft 100s linear infinite" }}
					>
						{Images.concat(Images).map((image, index) => (
							<span
								key={index}
								className="relative inline-block h-[76px] w-[76px] rounded-[10px] tablet:h-[147px] tablet:w-[147px] tablet:rounded-[15px] desktop:h-[360px] desktop:w-[360px] desktop:rounded-[25px]"
								style={{ backgroundColor: image.bgColor }}
							>
								<Image src={image.src} alt={image.alt} layout="fill" objectFit="contain" />
							</span>
						))}
					</div>
					<style jsx>
						{`
							@keyframes scrollLeft {
								0% {
									transform: translateX(0);
								}
								100% {
									transform: translateX(-50%);
								}
							}
						`}
					</style>
				</section>
				<section className="w-full pb-[100px] tablet:pb-[160px] desktop:pb-[200px]">
					<div className={`${container} mt-[100px] tablet:mt-[160px] desktop:mt-[200px]`}>
						<span className={subTitleStyle}>VIEW</span>
						<p className={`${titleStyle} items-start text-gray-500`}>
							친구들이 달아준 <br /> 내용을 확인해 봐요
						</p>
						<div className="mt-[40px] flex flex-col gap-[10px] tablet:mt-[80px] tablet:gap-[22px] desktop:mt-[120px] desktop:gap-[40px]">
							<Image src="/images/review.svg" className="" alt="자기소개 이미지" />
							<div className="flex justify-between gap-[10px] tablet:gap-[22px] desktop:gap-[40px]">
								<Image
									className="w-[102px] rounded-[10px] bg-purple tablet:w-[198px] tablet:rounded-[20px] desktop:w-[280px]"
									src="/images/bell.svg"
									alt="종 이미지"
								/>
								<Image src="/images/alarm.svg" className="w-[223px] tablet:w-[428px] desktop:w-[604px]" alt="알림 이미지" />
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="bg-gray-500 py-[100px] text-center tablet:py-[160px] desktop:py-[200px]">
				<p className="font-title mb-[30px] text-[30px] text-white tablet:mb-[40px] tablet:text-[60px]">나만의 위키 만들어 보기</p>
				<Link href="" className="rounded-[15px] bg-white p-[15px_30px] text-2xl font-bold text-gray-500">
					지금 시작하기
				</Link>
			</footer>
		</>
	);
}
