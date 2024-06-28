import Popover from "@/_components/general/Popover";

export default function Page() {
	return (
		<main className="flex h-screen w-screen flex-col items-center justify-center gap-[10px]">
				<Popover gap={10} placement="top" element={<div>죽어</div>}>
					<button className="rounded-[10px] border border-primary-200 bg-primary-100 px-[10px] py-[10px]">ㅇㅇㅇ</button>
				</Popover>
				<Popover gap={10} placement="left" element={<div>죽어</div>}>
					<button className="rounded-[10px] border border-primary-200 bg-primary-100 px-[10px] py-[10px]">ㅇㅇㅇ</button>
				</Popover>
				<Popover gap={10} placement="right" element={<div>죽어</div>}>
					<button className="rounded-[10px] border border-primary-200 bg-primary-100 px-[10px] py-[10px]">ㅇㅇㅇ</button>
				</Popover>
				<Popover gap={10} placement="bottom" element={<div>죽어</div>}>
					<button className="rounded-[10px] border border-primary-200 bg-primary-100 px-[10px] py-[10px]">ㅇㅇㅇ</button>
				</Popover>
		</main>
	);
}
