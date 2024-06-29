import Popover from "@/_components/general/Popover";

export default function Page() {
	return (
		<main className="flex h-screen w-screen flex-col items-center justify-center gap-[10px]">
			<Popover gap={10} trigger="click" position="top" overlay={<div className="w-[100px] bg-gray-400">죽어</div>}>
				<button className="rounded-[10px] border border-primary-200 bg-primary-100 px-[10px] py-[10px]">ㅇㅇㅇ</button>
			</Popover>
			<Popover gap={10} trigger="hover" position="left" overlay={<div className="h-[100px] w-full bg-gray-400">죽어</div>}>
				<button className="rounded-[10px] border border-primary-200 bg-primary-100 px-[10px] py-[10px]">ㅇㅇㅇ</button>
			</Popover>
			<Popover gap={10} trigger="hover" position="right" overlay={<div className="h-[100px] w-full bg-gray-400">죽어</div>}>
				<button className="rounded-[10px] border border-primary-200 bg-primary-100 px-[10px] py-[10px]">ㅇㅇㅇ</button>
			</Popover>
			<Popover gap={10} trigger="click" position="bottom" overlay={<div className="w-full bg-gray-400">죽어</div>}>
				<button className="rounded-[10px] border border-primary-200 bg-primary-100 px-[10px] py-[10px]">ㅇㅇㅇ</button>
			</Popover>
		</main>
	);
}
