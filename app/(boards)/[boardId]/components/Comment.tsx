"use client";

import React, { useState } from "react";

import CommentItem from "./CommentItem";
import EmptyState from "./EmptyState";

// TODO:무한 스크롤
const Comment = () => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	if (comments && !comments.length) {
		return <EmptyState text={"아직 댓글이 없습니다."} />;
	} else {
		return (
			<div className="flex flex-col gap-6">
				{comments.map((item) => (
					<CommentItem item={item} key={`comment-${item.id}`} />
				))}
			</div>
		);
	}
};

export default Comment;
