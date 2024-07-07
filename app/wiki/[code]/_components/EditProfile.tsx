import API from "@/_api";
import Toast from "@/_utilities/Toast";
import { useState } from "react";

import CameraIcon from "../../../../public/icons/CameraIcon";

type ProfileType = Omit<Awaited<Parameters<(typeof API)["{teamId}/profiles/{code}"]["PATCH"]>[1]>, "securityAnswer" | "securityQuestion">;

type Props = {
	setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
	profile: ProfileType;
	setImageFile: React.Dispatch<React.SetStateAction<File>>;
};

export default function EditProfile({ setProfile, profile, setImageFile }: Props) {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;
		setProfile((prev) => ({ ...prev, [id]: value }));
	};

	const [preview, setPreview] = useState<FileReader["result"]>(profile.image ?? null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			if (!/^[a-zA-Z0-9._\-\s]+\.(png|jpe?g)$/.test(file.name)) {
				return Toast.error("이미지의 확장자를 확인해주세요");
			}
			if (file.size > 1024 /* 1KB = 1024byte */ * 1024 /* 1MB = 1024KB */ * 5) {
				return Toast.error("최대 5MB의 이미지만 업로그 가능합니다");
			}

			const reader = new FileReader();

			reader.addEventListener("load", (event) => {
				setPreview(reader.result);
			});

			reader.readAsDataURL(file);

			setImageFile(file);
		}
	};

	return (
		<div className="flex w-full flex-col gap-4 tablet:gap-5 desktop:flex-col-reverse desktop:gap-6">
			<div className="flex flex-col rounded-[10px] bg-white px-5 py-[15px] shadow-basic tablet:px-[30px] tablet:py-5 desktop:w-[320px] desktop:py-[60px]">
				<div className="m-auto h-[62px] w-[62px] tablet:h-[71px] tablet:w-[71px] desktop:h-[200px] desktop:w-[200px]">
					<label htmlFor="image">
						<div
							className="flex aspect-square w-full items-center justify-center rounded-full bg-gray-200 bg-cover bg-center text-white"
							style={{ backgroundImage: `url("${preview}")` }}
						>
							{preview ? (
								<div className="flex aspect-square w-full items-center justify-center rounded-full bg-black opacity-50">
									<CameraIcon width="35" height="35" />
								</div>
							) : (
								<CameraIcon width="35" height="35" />
							)}
						</div>
						<input id="image" type="file" accept=".png,.jpg,.jpeg,.webp" multiple={false} className="hidden" onChange={handleImageChange} />
					</label>
				</div>
				<div className="mt-6 flex flex-col gap-4 tablet:mt-8 tablet:flex-row tablet:gap-10 tablet:text-md desktop:mt-[60px] desktop:flex-col desktop:gap-4">
					<div className="flex flex-col gap-4 tablet:flex-1 desktop:flex-none">
						<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
							<label className="min-w-[60px] flex-shrink-0 text-xs font-normal text-gray-400 tablet:text-md" htmlFor="city">
								거주 도시
							</label>
							<input
								className="min-w-0 grow rounded-[10px] bg-gray-100 px-4 py-2 text-xs font-normal text-gray-500 outline-primary-200 tablet:text-md"
								id="city"
								value={profile.city}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
							<label className="min-w-[60px] flex-shrink-0 text-xs font-normal text-gray-400 tablet:text-md" htmlFor="mbti">
								MBTI
							</label>
							<input
								className="min-w-0 grow rounded-[10px] bg-gray-100 px-4 py-2 text-xs font-normal text-gray-500 outline-primary-200 tablet:text-md"
								id="mbti"
								value={profile.mbti}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
							<label className="min-w-[60px] flex-shrink-0 text-xs font-normal text-gray-400 tablet:text-md" htmlFor="job">
								직업
							</label>
							<input
								className="min-w-0 grow rounded-[10px] bg-gray-100 px-4 py-2 text-xs font-normal text-gray-500 outline-primary-200 tablet:text-md"
								id="job"
								value={profile.job}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
							<label className="min-w-[60px] flex-shrink-0 text-xs font-normal text-gray-400 tablet:text-md" htmlFor="sns">
								SNS 계정
							</label>
							<input
								className="min-w-0 grow rounded-[10px] bg-gray-100 px-4 py-2 text-xs font-normal text-gray-500 outline-primary-200 tablet:text-md"
								id="sns"
								value={profile.sns}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 tablet:flex-1 desktop:flex-none">
						<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
							<label className="min-w-[60px] flex-shrink-0 text-xs font-normal text-gray-400 tablet:text-md" htmlFor="birthday">
								생일
							</label>
							<input
								className="min-w-0 grow rounded-[10px] bg-gray-100 px-4 py-2 text-xs font-normal text-gray-500 outline-primary-200 tablet:text-md"
								id="birthday"
								value={profile.birthday}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
							<label className="min-w-[60px] flex-shrink-0 text-xs font-normal text-gray-400 tablet:text-md" htmlFor="nickname">
								별명
							</label>
							<input
								className="min-w-0 grow rounded-[10px] bg-gray-100 px-4 py-2 text-xs font-normal text-gray-500 outline-primary-200 tablet:text-md"
								id="nickname"
								value={profile.nickname}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
							<label className="min-w-[60px] flex-shrink-0 text-xs font-normal text-gray-400 tablet:text-md" htmlFor="bloodtype">
								혈액형
							</label>
							<input
								className="min-w-0 grow rounded-[10px] bg-gray-100 px-4 py-2 text-xs font-normal text-gray-500 outline-primary-200 tablet:text-md"
								id="bloodType"
								value={profile.bloodType}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex items-center gap-2 tablet:gap-4 desktop:gap-5">
							<label className="min-w-[60px] flex-shrink-0 text-xs font-normal text-gray-400 tablet:text-md" htmlFor="nationality">
								국적
							</label>
							<input
								className="min-w-0 grow rounded-[10px] bg-gray-100 px-4 py-2 text-xs font-normal text-gray-500 outline-primary-200 tablet:text-md"
								id="nationality"
								value={profile.nationality}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
