import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";

import { useDropdownContext } from "@/_components/general/Dropdown";

type OptionsContainerProps = {
	dropdownRef: React.RefObject<HTMLDivElement>;
} & React.PropsWithChildren;

export default function OptionsContainer({ dropdownRef, children }: OptionsContainerProps) {
	// 외부 영역 클릭 시, option들 닫기
	const { isOptionsVisible, hideOptions } = useDropdownContext();

	const onOutsideClick = ({ target }: MouseEvent) => {
		if (isOptionsVisible && dropdownRef.current && !dropdownRef.current.contains(target as Node)) {
			hideOptions();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", onOutsideClick);
		return () => {
			document.removeEventListener("mousedown", onOutsideClick);
		};
	}, [isOptionsVisible]);

	// 방향키로 children focus
	const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
	const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setFocusedOptionIndex((prevIndex) => (prevIndex + 1) % optionsRef.current.length);
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			setFocusedOptionIndex((prevIndex) =>
				prevIndex === -1 ? optionsRef.current.length - 1 : (prevIndex - 1 + optionsRef.current.length) % optionsRef.current.length,
			);
		}
	};

	useEffect(() => {
		if (focusedOptionIndex >= 0 && optionsRef.current[focusedOptionIndex]) {
			optionsRef.current[focusedOptionIndex]?.focus();
		}

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [focusedOptionIndex]);

	return (
		<div className="absolute z-10 mt-1 flex w-full flex-col rounded-[10px] bg-scroll">
			{Children.map(children, (child, index) =>
				cloneElement(child as React.ReactElement, { ref: (el: HTMLButtonElement) => (optionsRef.current[index] = el) }),
			)}
		</div>
	);
}
