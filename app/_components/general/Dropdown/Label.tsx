import Image from "next/image";

import { useDropdownContext } from "./index";

type LabelProps = {
	children: string;
};

export default function Label({ children: defaultContent }: LabelProps) {
	const { selectedOption, toggleOptions } = useDropdownContext();

	const labelContent = selectedOption.content === "" ? defaultContent : selectedOption.content;

	return (
		<button
			className="flex h-[45px] w-full items-center justify-between rounded-[10px] bg-gray-100 px-[20px] py-[10px] transition hover:bg-gray-200 active:bg-gray-300"
			onClick={toggleOptions}
		>
			<p className="truncate text-md font-normal text-gray-500">{labelContent}</p>
			<Image src="icons/triangle_down.svg" width={22} height={22} alt="메뉴 열기 아이콘" />
		</button>
	);
}
