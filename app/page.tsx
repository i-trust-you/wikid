import Popover from "@/_components/general/Popover";

export default function Page() {
	const overlay = (
		<div className="flex w-[120px] flex-col items-center border border-red-200 bg-white shadow-lg">
			<div>위키목록</div>
			<div>자유게시판</div>
			<div>알림</div>
			<div>마이페이지</div>
		</div>
	);
	return (
		<main className="flex h-screen flex-col items-center justify-center gap-[10px]">
			<Popover gap={5} trigger="click" position="top-right-top-left" overlay={overlay}>
				<div className="h-[24px] w-[24px] border border-red-200"></div>
			</Popover>
			<Popover gap={5} trigger="click" position="top-right-bottom-left" overlay={overlay}>
				<div className="h-[24px] w-[24px] border border-red-200"></div>
			</Popover>
			<Popover gap={5} trigger="click" position="bottom-right-top-left" overlay={overlay}>
				<div className="h-[24px] w-[24px] border border-red-200"></div>
			</Popover>
			<Popover gap={5} trigger="click" position="bottom-right-bottom-left" overlay={overlay}>
				<div className="h-[24px] w-[24px] border border-red-200"></div>
			</Popover>
			<Popover gap={5} trigger="click" position="top-left-top-right" overlay={overlay}>
				<div className="h-[24px] w-[24px] border border-red-200"></div>
			</Popover>
			<Popover gap={5} trigger="click" position="top-left-bottom-right" overlay={overlay}>
				<div className="h-[24px] w-[24px] border border-red-200"></div>
			</Popover>
			<Popover gap={5} trigger="click" position="bottom-left-top-right" overlay={overlay}>
				<div className="h-[24px] w-[24px] border border-red-200"></div>
			</Popover>
			<Popover gap={5} trigger="click" position="bottom-left-bottom-right" overlay={overlay}>
				<div className="h-[24px] w-[24px] border border-red-200"></div>
			</Popover>
			<Popover gap={5} trigger="click" position="top-left-bottom-left" overlay={overlay}>
				<div className="h-[24px] w-[24px] border border-red-200"></div>
			</Popover>
			<Popover gap={5} trigger="click" position="top-right-bottom-right" overlay={overlay}>
				<div className="h-[24px] w-[24px] border border-red-200"></div>
			</Popover>
		</main>
	);
}
