import Image from "next/image";

import Heart from "../../../../public/icons/heart.svg";

const Article = async () => {
	return (
		<div className="shadow-basic flex w-[1060px] flex-col gap-4 rounded-[10px] border">
			<div className="flex w-[1000px] flex-col">
				<div className="flex justify-between">
					<h1>게시물 제목입니다.</h1>
					<div className="flex justify-between gap-[14px]">
						<button>수정하기</button>
						<button>삭제하기</button>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex gap-[10px]">
						<span>이름</span>
						<span>날짜</span>
					</div>
					<div className="flex items-center gap-[2px]">
						<Image src={Heart} className="h-[18px] w-[18px]" alt="좋아요 버튼" />
						<span>좋아요 count</span>
					</div>
				</div>
				<Image src={Heart} alt="이미지 받아오기" height={300} width={500} />
			</div>
		</div>
	);
};

export default Article;
