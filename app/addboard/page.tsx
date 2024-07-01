import Button from "@/_components/common/Button";

import AlignCenterIcon from "../../public/icons/AlignCenterIcon";
import AlignLeftIcon from "../../public/icons/AlignLeftIcon";
import AlignRightIcon from "../../public/icons/AlignRightIcon";
import BoldIcon from "../../public/icons/BoldIcon";
import BulletIcon from "../../public/icons/BulletIcon";
import ColoringIcon from "../../public/icons/ColoringIcon";
import ImageIcon from "../../public/icons/ImageIcon";
import ItalicIcon from "../../public/icons/ItalicIcon";
import LinkIcon from "../../public/icons/LinkIcon";
import NumberingIcon from "../../public/icons/NumberingIcon";
import UnderlineIcon from "../../public/icons/UnderlineIcon";

export default function Page() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-evenly">
			<div className="my-[54px] flex h-[846px] w-[1060px] flex-col px-[30px] tablet:rounded-xl tablet:border tablet:border-solid tablet:border-[#E2E8F0] tablet:shadow">
				<div className="mt-[20px] h-[95px] grow-0 tablet:mt-[40px] desktop:mt-[46px]">
					<div className="mb-[24px] flex justify-between justify-items-center">
						<div className="text-2xl font-semibold">게시물 등록하기</div>
						<div className="h-[45px] w-[140px]">
							<Button style="basic" disabled>
								등록하기
							</Button>
						</div>
					</div>
					<div className="h-[26px] text-lg font-normal text-gray-600">등록일 2024.02.24.</div>
				</div>
				<div className="mt-[20px] grow-0 tablet:mt-[25px] desktop:mt-[33px]">
					<div className="flex h-[50px] items-center justify-between border-y border-solid py-[12px] tablet:h-[56px]">
						<input className="placeholder:text-xl placeholder:font-medium" placeholder="제목을 입력해주세요"></input>
						<div className="text-md font-medium">0/30</div>
					</div>
					<div className="mt-[20px] text-lg font-medium">공백 포함: 총 0자 | 공백 제외: 총 0자</div>
				</div>
				<textarea className="mt-[20px] w-full grow resize-none placeholder:text-xl placeholder:font-normal" placeholder="본문을 입력해주세요" />
				<div className="flex h-[44px] grow-0 items-center justify-between rounded-full border border-solid p-[10px] tablet:my-[30px] tablet:px-[16px] tablet:py-[10px] desktop:my-[40px]">
					<div className="flex">
						<div className="flex">
							<div className="mr-[2px]">
								<BoldIcon width="24" height="24" />
							</div>
							<div className="mx-[2px]">
								<ItalicIcon width="24" height="24" />
							</div>
							<div className="ml-[2px]">
								<UnderlineIcon width="24" height="24" />
							</div>
						</div>
						<div className="flex">
							<div className="mr-[2px]">
								<AlignLeftIcon width="24" height="24" />
							</div>
							<div className="mx-[2px]">
								<AlignCenterIcon width="24" height="24" />
							</div>
							<div className="ml-[2px]">
								<AlignRightIcon width="24" height="24" />
							</div>
						</div>
						<div className="flex">
							<div className="mr-[2px]">
								<BulletIcon width="24" height="24" />
							</div>
							<div className="mx-[2px]">
								<NumberingIcon width="24" height="24" />
							</div>
							<div className="mx-[2px]">
								<ColoringIcon width="24" height="24" />
							</div>
							<div className="ml-[2px]">
								<ImageIcon width="24" height="24" />
							</div>
						</div>
					</div>
					<LinkIcon width="24" height="24" />
				</div>
			</div>
			<div className="h-[45px] w-[140px]">
				<Button style="outline">목록으로</Button>
			</div>
		</div>
	);
}
