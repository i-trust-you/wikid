import React from "react";

import Delete from "../../../../public/icons/delete.svg";
import Edit from "../../../../public/icons/edit.svg";
import Profile from "../../../../public/icons/profile.svg";

interface CommentItemProps {
	item: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ item }) => {
	return (
		<div className="shadow-basic flex h-[136px] gap-[20px] rounded-[10px] px-[30px] py-[22px]">
			<Profile width={50} height={50} alt="작성자 사진" />
			<div className="flex flex-col gap-[10px]">
				<div className="flex flex-col gap-[6px]">
					<div className="flex justify-between">
						<h1>작성자</h1>
						<div className="flex gap-5">
							<Edit width={24} height={24} alt="수정 버튼" />
							<Delete width={24} height={24} alt="삭제 버튼" />
						</div>
					</div>
					<p>댓글 내용</p>
				</div>
				<p>날짜</p>
			</div>
		</div>
	);
};

export default CommentItem;
