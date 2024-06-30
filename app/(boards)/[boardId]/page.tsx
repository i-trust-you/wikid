import API from "@/_api";
import React from "react";

import Button from "@/_components/common/Button";

import Article from "./components/Article";
import Comment from "./components/Comment";

interface paramsProps {
	params: { articleId: number };
}

// TODO: articleId 동적으로 받아오게끔
export const getArticleData = async (articleId: number) => {
	const res = await API["{teamId}/articles/{articleId}"].GET({ teamId: "6-11", articleId: 16 });
	return res;
};

export const getCommentData = async (articleId: number) => {
	const res = await API["{teamId}/articles/{articleId}/comments"].GET({ articleId: 14, limit: 4 });
	return res.list;
};

const BoardPage = async ({ params: { articleId } }: paramsProps) => {
	return (
		<div className="m-auto flex w-[335px] flex-col items-center gap-10 tablet:w-[624px] desktop:w-[1060px]">
			<Article articleId={articleId} />
			<div className="h-[45px] w-[140px]">
				<Button href="boards" style="outline">
					목록으로
				</Button>
			</div>

			<Comment articleId={articleId} />
		</div>
	);
};

export default BoardPage;
