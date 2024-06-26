import { Children, isValidElement, useRef } from "react";

import { useDropdownContext } from "@/_components/general/Dropdown";

import Label from "./Label";
import OptionsContainer from "./OptionsContainer";

export default function Container({ children }: React.PropsWithChildren) {
	const label = Children.toArray(children).find((child) => isValidElement(child) && child.type === Label);
	const options = Children.toArray(children).filter((child) => !isValidElement(child) || child.type !== Label);

	const { isOptionsVisible } = useDropdownContext();

	const dropdownRef = useRef<HTMLDivElement>(null);

	return (
		<div className="relative" ref={dropdownRef}>
			{label}
			{isOptionsVisible && <OptionsContainer dropdownRef={dropdownRef}>{options}</OptionsContainer>}
		</div>
	);
}
