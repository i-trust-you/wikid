import { forwardRef } from "react";

import { OptionType, useDropdownContext } from "./index";

type OptionProps = {
	value: OptionType["value"];
	children: OptionType["content"];
	onSelect: ({ value, content }: OptionType) => void;
	align?: "left" | "center";
};

const Option = forwardRef<HTMLButtonElement, OptionProps>(({ value, onSelect, children: content, align = "center" }, ref) => {
	const { hideOptions, setSelectedOption } = useDropdownContext();

	const handleSelect = (option: OptionType) => {
		hideOptions();
		setSelectedOption(option);
		onSelect(option);
	};

	return (
		<button
			className={`text-${align} border-gray-200 bg-gray-100 px-[20px] py-[10px] text-md font-normal text-gray-500 transition first:rounded-t-[10px] last:rounded-b-[10px] hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300 [&:not(:first-child)]:border-t`}
			onClick={() => handleSelect({ value, content })}
			tabIndex={0}
			ref={ref}
		>
			{content}
		</button>
	);
});

Option.displayName = "Option";

export default Option;
