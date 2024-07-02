import Dropdown from "@/_components/general/Dropdown";

import TriangleDownIcon from "../../../public/icons/TriangleDownIcon";

interface Option {
	value: string;
	content: string;
}

interface BoardDropdownProps {
	options: Option[];
	onSelect: (value: Option["value"]) => void;
}

export default function BoardDropdown({ options, onSelect }: BoardDropdownProps) {
	return (
		<div className="relative w-full">
			<Dropdown options={options} onSelect={onSelect}>
				<div className="[&_button]:flex [&_button]:h-[45px] [&_button]:w-full [&_button]:items-center [&_button]:justify-between [&_button]:rounded-[10px] [&_button]:bg-gray-100 [&_button]:px-[20px] [&_button]:py-[10px] [&_button]:transition [&_button]:hover:bg-gray-200 [&_button]:active:bg-gray-300">
					<Dropdown.Trigger>
						<p className="truncate text-md font-normal text-gray-500">
							<Dropdown.Current />
						</p>
						<TriangleDownIcon width="22" height="22" />
					</Dropdown.Trigger>
				</div>
				<div className="absolute z-10 mt-1 flex w-full flex-col rounded-[10px] bg-scroll">
					<Dropdown.Generator>
						{(content) => (
							<button className="border-gray-200 bg-gray-100 px-[20px] py-[10px] text-md font-normal text-gray-500 transition first:rounded-t-[10px] last:rounded-b-[10px] hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300 [&:not(:first-child)]:border-t">
								{content}
							</button>
						)}
					</Dropdown.Generator>
				</div>
			</Dropdown>
		</div>
	);
}
