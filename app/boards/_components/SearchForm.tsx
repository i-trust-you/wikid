"use client";

import { useState } from "react";

import Button from "@/_components/common/Button";

import SearchIcon from "../../../public/icons/SearchIcon";

type SearchFormProps = {
	onSubmit: (value: string) => void;
};

export default function SearchForm({ onSubmit }: SearchFormProps) {
	const [value, setValue] = useState<string>("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(value);
	};

	return (
		<form className="flex h-[45px] gap-[15px] tablet:gap-5" onSubmit={handleSubmit}>
			<div className="relative flex grow items-center">
				<div className="absolute left-5">
					<SearchIcon width={22} height={22} />
				</div>
				<input
					className="h-full w-full rounded-[10px] bg-gray-100 py-[10px] pl-[57px] pr-[20px] text-lg font-medium text-gray-500 outline-primary-200 placeholder:text-gray-400"
					placeholder="제목을 검색해 주세요"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</div>
			<div className="min-w-[80px]">
				<Button>검색</Button>
			</div>
		</form>
	);
}
