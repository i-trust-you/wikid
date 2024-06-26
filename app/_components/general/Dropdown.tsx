import Image from "next/image";
import { Children, cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";

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

	const toggleOptions = () => {
		setIsOpen((prev) => !prev);
	};
	const hideOptions = () => {
		setIsOpen(false);
	};

	const handleSelect = (option: Option) => {
		setSelectedOption(option);
		onSelect(option.value, option.content);
		hideOptions();
	};

	const dropdownRef = useRef<HTMLDivElement>(null);

	if (!children) {
		return (
			<div className="relative w-full tablet:max-w-[120px] desktop:max-w-[140px]">
				<Dropdown options={options} onSelect={onSelect}>
					<div className="[&_button]:flex [&_button]:h-[45px] [&_button]:w-full [&_button]:items-center [&_button]:justify-between [&_button]:rounded-[10px] [&_button]:bg-gray-100 [&_button]:px-[20px] [&_button]:py-[10px] [&_button]:transition [&_button]:hover:bg-gray-200 [&_button]:active:bg-gray-300">
						<Dropdown.Trigger>
							{(value) => (
								<>
									<p className="truncate text-md font-normal text-gray-500">{value}</p>
									<Image src="icons/triangle_down.svg" width={22} height={22} alt="메뉴 열기 아이콘" />
								</>
							)}
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

	return (
		<DropdownContext.Provider value={{ options, isOpen, toggleOptions, hideOptions, selectedOption, handleSelect, dropdownRef }}>
			<div ref={dropdownRef}>{children}</div>
		</DropdownContext.Provider>
	);
}

interface TriggerProps {
	defaultValue?: string;
	children: (value: string) => JSX.Element;
}

function Trigger({ defaultValue, children }: TriggerProps) {
	const { options, selectedOption, toggleOptions } = useDropdownContext();
	const value = selectedOption?.content ?? defaultValue ?? options[0].content;

	return <button onClick={toggleOptions}>{children(value)}</button>;
}

interface GeneratorProps {
	children: (content: string) => JSX.Element;
}

function Generator({ children }: GeneratorProps) {
	const { options, isOpen, handleSelect } = useDropdownContext();

	return (
		isOpen && (
			<EventHandler>
				{options.map((option) => cloneElement(children(option.content), { onClick: () => handleSelect(option), key: option.value, tabIndex: 0 }))}
			</EventHandler>
		)
	);
}

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

Dropdown.Trigger = Trigger;
Dropdown.Generator = Generator;
