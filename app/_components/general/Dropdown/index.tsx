import { createContext, useContext, useState } from "react";

import DropdownWithChildren from "./DropdownWithChildren";
import DropdownWithoutChildren, { DropdownWithoutChildrenProps } from "./DropdownWithoutChildren";
import Label from "./Label";
import Option from "./Option";

export type OptionType = {
	value: string;
	content: string;
};

type DropdownContextProps = {
	isOptionsVisible: boolean;
	toggleOptions: () => void;
	hideOptions: () => void;
	selectedOption: OptionType;
	setSelectedOption: React.Dispatch<React.SetStateAction<OptionType>>;
};

const DropdownContext = createContext<DropdownContextProps>({
	isOptionsVisible: false,
	toggleOptions: () => {},
	hideOptions: () => {},
	selectedOption: { value: "", content: "" },
	setSelectedOption: () => {},
});

export const useDropdownContext = () => {
	const context = useContext(DropdownContext);
	if (!context) {
		throw Error("Dropdown 컴포넌트 내부에 위치시켜주세요.");
	}
	return context;
};

export default function Dropdown({
	defaultContent,
	options,
	onSelect,
	optionAlign,
	children,
}: Partial<DropdownWithoutChildrenProps & React.PropsWithChildren>) {
	const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
	const [selectedOption, setSelectedOption] = useState<OptionType>({ value: "", content: "" });

	const toggleOptions = () => {
		setIsOptionsVisible((prev) => !prev);
	};
	const hideOptions = () => {
		setIsOptionsVisible(false);
	};

	const contextValue = {
		isOptionsVisible,
		toggleOptions,
		hideOptions,
		selectedOption,
		setSelectedOption,
	};

	return (
		<DropdownContext.Provider value={contextValue}>
			{!children && onSelect && options ? (
				<DropdownWithoutChildren options={options} onSelect={onSelect} defaultContent={defaultContent} optionAlign={optionAlign} />
			) : (
				<DropdownWithChildren>{children}</DropdownWithChildren>
			)}
		</DropdownContext.Provider>
	);
}

Dropdown.Label = Label;
Dropdown.Option = Option;
