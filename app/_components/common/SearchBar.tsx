import Image from "next/image";
import { useEffect, useState } from "react";

import useDebounce from "@/_hooks/useDebounce";

type SearchBarProps = {
	onChange: (value: string) => void;
};

export function SearchBar({ onChange }: SearchBarProps) {
	const [value, setValue] = useState<string>("");
	const debouncedValue = useDebounce<string>(value);

	useEffect(() => {
		if (debouncedValue) {
			onChange(debouncedValue);
		}
	}, [debouncedValue]);

	return (
		<div className="relative flex items-center">
			<Image className="absolute left-[20px]" src="/icons/search.svg" alt="검색 아이콘" width={22} height={22} />
			<input
				className="h-[45px] w-full rounded-[10px] bg-gray-100 py-[10px] pl-[57px] pr-[20px] text-xl font-medium text-gray-500"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}

type SearchFormProps = {
	onSubmit: (value: string) => void;
};

export function SearchForm({ onSubmit }: SearchFormProps) {
	const [value, setValue] = useState<string>("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(value);
	};

	return (
		<form className="flex h-[45px] gap-[15px] tablet:gap-5" onSubmit={handleSubmit}>
			<div className="relative flex grow items-center">
				<Image className="absolute left-[20px]" src="/icons/search.svg" alt="검색 아이콘" width={22} height={22} />
				<input
					className="h-full w-full rounded-[10px] bg-gray-100 py-[10px] pl-[57px] pr-[20px] text-lg font-medium text-gray-500 placeholder:text-gray-400"
					placeholder="제목을 검색해 주세요"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</div>
			<button className="flex w-[80px] items-center justify-center rounded-[10px] bg-primary-200 text-md font-semibold text-white transition hover:bg-primary-300">
				검색
			</button>
		</form>
	);
}
