import API from "@/_api";
import { createRef, useEffect, useState } from "react";

import Form from "@/_components/general/Form";

export default function CommentForm({ articleId }: { articleId: number }) {
	const elementRef = createRef<HTMLDivElement>();
	const [commentLength, setCommentLength] = useState<number>(0);
	useEffect(() => {
		const input = document.querySelector("form > input[id=content]") as HTMLInputElement;
		const form = input?.form as HTMLFormElement;
		input.addEventListener("keyup", (e) => {
			setCommentLength((e.target as HTMLInputElement).value.length);
		});
		input.setAttribute("class", "w-full bg-transparent focus:outline-none placeholder:text-md placeholder:text-gray-600");
		form.setAttribute(
			"class",
			"flex flex-col justify-between desktop:w-[1055px] desktop:h-[133px] tablet:w-[624px] tablet:h-[140px] w-[335px] h-[140px] rounded-[10px] px-[15px] py-[13px] bg-gray-50 bg-gray-200",
		);
		input.classList.add();
		form.classList.add();
	}, [elementRef]);
	return (
		<Form
			onSubmit={(data) => {
				API["{teamId}/articles/{articleId}/comments"].POST({ teamId: "6-11", articleId }, { content: data.get("content") as string });
			}}
		>
			<Form.Input.Text id="content" placeholder="댓글을 입력해 주세요" maxlength={{ message: "", value: 500 }} />
			<div className="flex items-end justify-between">
				<div ref={elementRef} className="text-md text-gray-300">
					{commentLength} / 500
				</div>
				<div className="h-[45px] w-[120px] rounded-[10px]">
					<Form.Submit>댓글 등록</Form.Submit>
				</div>
			</div>
		</Form>
	);
}
