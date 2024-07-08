import API from "@/_api";
import React, { useState } from "react";

import Button from "@/_components/common/Button";

export default function CommentForm({ articleId }: { articleId: number }) {
	const [value, setValue] = useState<string>("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await API["{teamId}/articles/{articleId}/comments"].POST({ articleId }, { content: value });
		window.location.reload();
	};

	return (
		<form
			className="group flex h-[133px] w-full flex-col gap-2 rounded-[10px] bg-gray-100 px-4 py-3 outline-primary-200 focus-within:outline focus-within:outline-2"
			onSubmit={handleSubmit}
		>
			<textarea
				className="w-full grow resize-none bg-transparent text-md font-normal text-gray-500 placeholder:text-gray-400 focus:outline-none"
				value={value}
				placeholder="댓글을 입력해 주세요 :3"
				onChange={(e) => setValue(e.target.value)}
				maxLength={500}
			/>
			<div className="flex items-end justify-between">
				<div className="text-md text-gray-300">{value.length} / 500</div>
				<div className="h-[45px] w-[120px]">
					<Button disabled={value.length < 1}>댓글 등록</Button>
				</div>
			</div>
		</form>
		// <Form
		// 	onSubmit={(data) => {
		// 		API["{teamId}/articles/{articleId}/comments"].POST({ teamId: "6-11", articleId }, { content: data.get("content") as string });
		// 	}}
		// >
		// 	<Form.Input.Text id="content" placeholder="댓글을 입력해 주세요" maxlength={{ message: "", value: 500 }} />
		// 	<div className="flex items-end justify-between">
		// 		<div ref={elementRef} className="text-md text-gray-300">
		// 			{commentLength} / 500
		// 		</div>
		// 		<div className="h-[45px] w-[120px] rounded-[10px]">
		// 			<Form.Submit>댓글 등록</Form.Submit>
		// 		</div>
		// 	</div>
		// </Form>
	);
}
