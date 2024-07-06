"use client";

import API from "@/_api";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Footer from "@/_components/common/Footer";

export default function Page() {
	const router = useRouter();

	const goWiki = async () => {
		await API["{teamId}/users/me"]
			.GET({})
			.then((response) => {
				if (!response.profile) {
					router.push("/mypage");
				} else {
					router.push(`/wiki/${response.profile.code}`);
				}
			})
			.catch(() => {
				router.push("/login");
			});
	};

	return (
		<>
			<main className="bg-[#F1F4FD]">
				<section className="relative flex flex-col items-center pt-[100px] tablet:pt-[120px]">
					<div className="flex flex-col items-center justify-center gap-[15px]">
						<h2 className="font-nexon text-4xl font-light leading-[1.15] text-gray-500 tablet:text-[60px]">남들이 만드는</h2>
						<h2 className="font-nexon text-[60px] font-bold leading-[1.15] text-gray-500 tablet:text-[90px]">나만의 위키</h2>
					</div>
					<button
						className="mt-10 rounded-[15px] bg-gray-500 px-[30px] py-[15px] text-xl font-bold leading-6 text-white transition hover:bg-gray-600 tablet:text-2xl"
						onClick={goWiki}
					>
						위키 만들기
					</button>
					<Image className="z-10 mt-[44px]" src="/images/profile.png" width={498} height={590} alt="프로필 이미지" />
					<div className="absolute bottom-0 h-[180px] w-[120vw] rounded-t-[70%] bg-gray-500 pb-20" />
				</section>
				<section className="flex justify-center bg-gray-500 px-5 py-[100px] tablet:py-[160px] desktop:py-[200px]">
					<div className="flex w-full max-w-[924px] gap-[10px] tablet:gap-5 desktop:gap-10">
						<div className="flex flex-col justify-between">
							<div>
								<p className="font-nexon text-[10px] font-bold leading-[1.15] text-primary-200 tablet:text-xl desktop:text-[30px]">WRITE</p>
								<h3 className="mt-[10px] font-nexon text-lg font-normal leading-[1.15] text-white tablet:mt-5 tablet:text-3xl desktop:text-[50px] desktop:leading-[1.15]">
									친구의 위키,
									<br />
									직접 작성해 봐요
								</h3>
							</div>
							<Image
								className="mt-[30px] object-cover tablet:mt-10 desktop:mt-[60px]"
								src="/images/keyboard.png"
								width={364}
								height={450}
								alt="키보드 이미지"
							/>
						</div>
						<div className="flex items-end">
							<Image className="object-cover" src="/images/promotion.png" width={520} height={681} alt="프로모션 이미지" />
						</div>
					</div>
				</section>
				<section className="flex flex-col items-end justify-center px-5 py-[100px] tablet:py-[160px] desktop:py-[200px]">
					<div className="m-auto flex w-full max-w-[924px] flex-col items-end text-right">
						<p className="font-nexon text-[10px] font-bold leading-[1.15] text-primary-200 tablet:text-xl desktop:text-[30px]">SHARE</p>
						<h3 className="mt-[10px] font-nexon text-lg font-normal leading-[1.15] text-gray-500 tablet:mt-5 tablet:text-3xl desktop:text-[50px] desktop:leading-[1.15]">
							내 위키 만들고
							<br />
							친구에게 공유해요
						</h3>
					</div>
					<div className="m-auto mt-10 flex w-full max-w-[1650px] justify-center gap-[10px] tablet:mt-[80px] tablet:gap-5 desktop:mt-[120px] desktop:gap-[70px]">
						<div>
							<Image src="/images/speaker.png" width={360} height={360} alt="스피커 이미지" />
						</div>
						<div>
							<Image src="/images/logo.png" width={360} height={360} alt="로고 이미지" />
						</div>
						<div>
							<Image src="/images/phone.png" width={360} height={360} alt="휴대폰 이미지" />
						</div>
						<div>
							<Image src="/images/bubbles.png" width={360} height={360} alt="말풍선 이미지" />
						</div>
					</div>
				</section>
				<section className="flex justify-center bg-[#ECF0FA] px-5 py-[100px] tablet:py-[160px] desktop:py-[200px]">
					<div className="flex w-full max-w-[924px] flex-col gap-10 tablet:gap-[80px] desktop:gap-[120px]">
						<div>
							<p className="font-nexon text-[10px] font-bold leading-[1.15] text-primary-200 tablet:text-xl desktop:text-[30px]">VIEW</p>
							<h3 className="mt-[10px] font-nexon text-lg font-normal leading-[1.15] text-gray-500 tablet:mt-5 tablet:text-3xl desktop:text-[50px] desktop:leading-[1.15]">
								친구들이 달아준
								<br />
								내용을 확인해 봐요
							</h3>
						</div>
						<div className="flex w-full flex-col gap-[10px] tablet:gap-5 desktop:gap-10">
							<div>
								<Image src="/images/review.png" width={924} height={280} alt="리뷰 이미지" />
							</div>
							<div className="flex justify-between gap-[10px] tablet:gap-5 desktop:gap-10">
								<div>
									<Image src="/images/bell.png" width={280} height={280} alt="벨 이미지" />
								</div>
								<div>
									<Image src="/images/alarm.png" width={604} height={280} alt="알람 이미지" />
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="flex flex-col items-center bg-gray-500 py-[100px] tablet:py-[160px] desktop:py-[200px]">
					<h2 className="font-nexon text-[30px] font-bold leading-[1.15] text-white tablet:text-[60px]">나만의 위키 만들어 보기</h2>
					<button
						className="mt-10 rounded-[15px] bg-white px-[30px] py-[15px] text-xl font-bold leading-4 text-gray-500 transition hover:bg-gray-200 active:bg-gray-300 tablet:text-2xl"
						onClick={goWiki}
					>
						지금 시작하기
					</button>
				</section>
			</main>
			<Footer />
		</>
	);
}
