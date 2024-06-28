import Image from "next/image";
import { Children, cloneElement, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

interface Option {
	value: string;
	content: string;
}

interface DropdownContextProps {
	options: Option[];
	isOpen: boolean;
	toggleOptions: () => void;
	hideOptions: () => void;
	selectedOption: Option | undefined;
	handleSelect: (option: Option) => void;
	dropdownRef: React.RefObject<HTMLDivElement>;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

const useDropdownContext = () => {
	const context = useContext(DropdownContext);
	if (!context) {
		throw Error("Dropdown 컴포넌트 내부에 위치시켜주세요.");
	}
	return context;
};

interface DropdownProps {
	options: Option[];
	onSelect: (value: string, content: string) => void;
}

export default function Dropdown({ options, onSelect, children }: DropdownProps & React.PropsWithChildren) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOption, setSelectedOption] = useState<Option>();

	const toggleOptions = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);
	const hideOptions = useCallback(() => {
		setIsOpen(false);
	}, []);

	const handleSelect = useCallback((option: Option) => {
		setSelectedOption(option);
		onSelect(option.value, option.content);
		hideOptions();
	}, []);

	const dropdownRef = useRef<HTMLDivElement>(null);

	return (
		<DropdownContext.Provider value={{ options, isOpen, toggleOptions, hideOptions, selectedOption, handleSelect, dropdownRef }}>
			<div ref={dropdownRef}>{children}</div>
		</DropdownContext.Provider>
	);
}

Dropdown.Trigger = function Trigger({ children }: React.PropsWithChildren) {
	const { toggleOptions } = useDropdownContext();

	return <button onClick={toggleOptions}>{children}</button>;
};

Dropdown.Current = function Current() {
	const { options, selectedOption } = useDropdownContext();
	const value = selectedOption?.content ?? options[0].content;

	return value;
};

interface GeneratorProps {
	children: (content: string) => JSX.Element;
}

Dropdown.Generator = function Generator({ children }: GeneratorProps) {
	const { options, isOpen, handleSelect } = useDropdownContext();

	return (
		isOpen && (
			<EventHandler>
				{options.map((option) => cloneElement(children(option.content), { onClick: () => handleSelect(option), key: option.value, tabIndex: 0 }))}
			</EventHandler>
		)
	);
};

function EventHandler({ children }: React.PropsWithChildren) {
	// 외부 영역 클릭 시, option들 닫기
	const { isOpen, hideOptions, dropdownRef } = useDropdownContext();

	const onOutsideClick = ({ target }: MouseEvent) => {
		if (isOpen && dropdownRef.current && !dropdownRef.current.contains(target as Node)) {
			hideOptions();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", onOutsideClick);

		return () => {
			document.removeEventListener("mousedown", onOutsideClick);
		};
	}, [isOpen]);

	// 방향키로 option focus
	const { options, handleSelect } = useDropdownContext();
	const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
	const optionsRef = useRef<(HTMLElement | null)[]>([]);

	const handleKeyDown = (event: KeyboardEvent) => {
		event.preventDefault();

		if (focusedOptionIndex > -1 && event.key === "Enter") {
			handleSelect(options[focusedOptionIndex]);
		} else if (event.key === "ArrowDown") {
			setFocusedOptionIndex((prevIndex) => (prevIndex + 1) % optionsRef.current.length);
		} else if (event.key === "ArrowUp") {
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
		<>{Children.map(children, (child, index) => cloneElement(child as React.ReactElement, { ref: (el: HTMLElement) => (optionsRef.current[index] = el) }))}</>
	);
}
