"use client";

import Button from "./_components/common/Button";

export default function Page() {
	return (
		<div className="m-auto mt-8 flex w-[500px] flex-col gap-2">
			<Button style="basic">버튼 basic</Button>
			<Button style="outline">버튼 outline</Button>
			<Button style="cancel">버튼 cancel</Button>
			<Button style="basic" disabled>
				버튼 basic disabled
			</Button>
			<Button style="outline" disabled>
				버튼 outline disabled
			</Button>
			<Button style="cancel" disabled>
				버튼 cancel disabled
			</Button>
			<Button href="" style="basic">
				링크 basic
			</Button>
			<Button href="" style="outline">
				링크 outline
			</Button>
			<Button href="" style="cancel">
				링크 cancel
			</Button>
			<Button href="" disabled style="basic">
				링크 basic disabled
			</Button>
			<Button href="" disabled style="outline">
				링크 outline disabled
			</Button>
			<Button href="" disabled style="cancel">
				링크 cancel disabled
			</Button>
		</div>
	);
}
