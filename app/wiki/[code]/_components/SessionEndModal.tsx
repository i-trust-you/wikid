import Button from "@/_components/common/Button";

export default function SessionEndModal() {
	return (
		<div className="flex flex-col items-end">
			<h3 className="w-full text-2lg font-semibold text-gray-500">5분 이상 글을 쓰지 않아 접속이 끊어졌어요.</h3>
			<p className="mt-[10px] w-full text-lg font-normal text-gray-400">위키 참여하기를 통해 다시 위키를 수정해 주세요.</p>
			<div className="mt-8 w-[65px]">
				<Button>확인</Button>
			</div>
		</div>
	);
}
