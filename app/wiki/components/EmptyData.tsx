import Button from "@/_components/common/Button";

const EmptyData = () => {
	return (
		<div className="flex w-[334px] flex-col items-center gap-4 rounded-[10px] bg-gray-100 py-10 tablet:w-[624px] tablet:gap-5 desktop:w-[859px]">
			<p className="text-center text-md font-normal text-gray-400 tablet:text-lg">
				아직 작성된 내용이 없네요.
				<br />
				위키에 참여해 보세요!
			</p>
			{/* // TODO: 시작하기 onClick */}
			<div className="h-10 w-[89px]">
				<Button>시작하기</Button>
			</div>
		</div>
	);
};

export default EmptyData;
