import Image from "next/image";

type ProfileCardProps = {
	profile: {
		updatedAt: string;
		job: string;
		nationality: string;
		city: string;
		image: string | null;
		code: string;
		name: string;
		id: number;
	};
};

export default function ProfileCard({ profile }: ProfileCardProps) {
	const { image, name, city, nationality, job, code } = profile;
	const defaultProfileImageUrl = "/icons/profile.svg";

	return (
		<div className="flex items-start rounded-[10px] px-[25px] py-[21px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] tablet:items-center tablet:px-9 tablet:py-6">
			<Image
				src={image || defaultProfileImageUrl}
				width={60}
				height={60}
				alt="프로필 사진"
				className="h-[60px] rounded-full object-cover tablet:h-[85px] tablet:w-[85px]"
			/>
			<div className="ml-5 flex grow flex-col gap-[14px] tablet:flex-row tablet:items-end">
				<div>
					<h3 className="mb-[10px] text-2xl font-semibold text-gray-500 tablet:mb-[14px]">{name}</h3>
					<p className="text-md font-normal text-gray-400">
						{city}
						{nationality && `, ${nationality}`}
					</p>
					<p className="text-md font-normal text-gray-400">{job}</p>
				</div>
				{/* TODO: url을 Backlink 컴포넌트로 변경 */}
				<div className="grow text-right">{code}</div>
			</div>
		</div>
	);
}
