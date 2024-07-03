import Button from "@/_components/common/Button";

import Article from "./components/Article";
import CommentList from "./components/CommentList";

export default function Page(props: { params: { slug: number } }) {
	const articleId = props.params.slug;
	return (
		<div className="m-auto flex w-[335px] flex-col items-center gap-10 tablet:w-[624px] desktop:w-[1060px]">
			<Article articleId={articleId} />
			<div className="h-[45px] w-[140px]">
				<Button href="/boards" style="outline">
					목록으로
				</Button>
			</div>
			<CommentList articleId={articleId} />
		</div>
	);
}
