import Image from "next/image";
import { useEffect, useState } from "react";

import useDebounce from "@/_hooks/useDebounce";

type SearchBarProps = {
	onChange: (value: string) => void;
};

export default function SearchBar({ onChange }: SearchBarProps) {
	const [value, setValue] = useState<string>("");
	const debouncedValue = useDebounce<string>(value);

	useEffect(() => {
		onChange(debouncedValue);
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
