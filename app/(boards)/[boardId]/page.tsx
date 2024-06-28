"use client";

import { useState } from "react";

import Article from "./components/Article";
import Comment from "./components/Comment";

interface paramsProps {
	params: { id: string };
}

const BoardDetail = ({ params: { id } }: paramsProps) => {
	const [commentCount, setCommentsCount] = useState(0);
	return (
		<div className="m-auto flex w-[1060px] flex-col gap-5">
			<Article />

			<div className="relative flex h-[45px] w-[140ox] justify-center">버튼</div>

			<div className="flex flex-col gap-2">
				<div className="text-2lg font-semibold text-gray-500">
					댓글 <span className="text-primary-200">{commentCount}</span>
				</div>
				{/* <Form /> */}
				Form 컴포넌트
			</div>

			<Comment />
		</div>
	);
};

export default BoardDetail;
