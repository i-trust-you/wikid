import Image from "next/image";

type ProfileCardProps = {
	profile: {
		image: string;
		name: string;
		area: string;
		job: string;
		url: string;
	};
};

export default function ProfileCard({ profile }: ProfileCardProps) {
	const { image, name, area, job, url } = profile;

	return (
		<div className="flex items-start rounded-[10px] px-[25px] py-[21px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] tablet:items-center tablet:px-9 tablet:py-6">
			<Image src={image} width={60} height={60} alt="프로필 사진" className="h-[60px] rounded-full object-cover tablet:h-[85px] tablet:w-[85px]" />
			<div className="ml-5 flex grow flex-col gap-[14px] tablet:flex-row tablet:items-end">
				<div className="">
					<h3 className="mb-[10px] text-2xl font-semibold text-gray-500 tablet:mb-[14px]">{name}</h3>
					<p className="text-md font-normal text-gray-400">{area}</p>
					<p className="text-md font-normal text-gray-400">{job}</p>
				</div>
				{/* TODO: url을 Backlink 컴포넌트로 변경 */}
				<div className="grow text-right">{url}</div>
			</div>
		</div>
	);
}
