"use client";

import API from "@/_api";
import { useEffect, useRef, useState } from "react";

import useObserver from "@/_hooks/useObserver";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

type CommentType = Awaited<ReturnType<(typeof API)["{teamId}/articles/{articleId}/comments"]["GET"]>>["list"][0];

export default function CommentList({ articleId }: { articleId: number }) {
	const [commentData, setCommentData] = useState<CommentType[]>([] as CommentType[]);
	const [nextComment, setNextComment] = useState<number>(0);
	const target = useRef<HTMLDivElement>(null);

	useEffect(() => {
		API["{teamId}/articles/{articleId}/comments"].GET({ teamId: "6-11", articleId: articleId, limit: 3 }).then((value) => {
			setCommentData(value.list);
			setNextComment(value.nextCursor ?? 0);
		});
	}, [articleId]);

	useObserver(
		target,
		0.3,
		function getNextCommentData() {
			if (nextComment === 0) return;
			API["{teamId}/articles/{articleId}/comments"].GET({ teamId: "6-11", articleId, limit: 3, cursor: nextComment }).then((value) => {
				setCommentData([...commentData, ...value.list]);
				setNextComment(value.nextCursor ?? 0);
			});
		},
		[nextComment],
	);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-1 text-lg font-semibold tablet:text-2lg">
				<span className="text-gray-500">댓글</span>
				<span className="text-primary-200">{commentData ? commentData.length : 0}</span>
			</div>
			<CommentForm articleId={articleId} />
			<div className="m-auto flex w-[335px] flex-col gap-[14px] tablet:w-[624px] tablet:gap-4 desktop:w-[1060px] desktop:gap-6">
				{commentData && commentData.length > 0 ? (
					<>
						{commentData.map((comment) => (
							<Comment key={comment.id} comment={comment} />
						))}
						<div ref={target} className="invisible h-[128px]"></div>
					</>
				) : (
					<div
						ref={target}
						className="flex h-[128px] items-center justify-center rounded-[10px] font-normal text-gray-400 shadow-basic tablet:h-[134px] tablet:text-xl desktop:h-[136px]"
					>
						작성된 댓글이 없습니다.
					</div>
				)}
			</div>
		</div>
	);
}
