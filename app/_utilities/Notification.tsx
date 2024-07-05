import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";


interface Message {
	id: number;
	since: Date;
	content: string;
}

export class Notification {
	protected static root?: ReactDOM.Root;

	private static render(children: Readonly<React.PropsWithChildren["children"]>) {
		// prettier-ignore
		(this.root ??= ReactDOM.createRoot(document.querySelector("#alert")!!))?.render(children);
	}

	public static open() {
		this.render(<Overlay msgs={entries} clamp={5} />);
	}

	public static close() {
		this.render(null);
	}

	public static read(id: number) {
		entries = entries.filter((entry) => entry.id !== id);

		this.open();
	}

	public static write(message: Omit<Message, "since">) {
		// update
		entries.unshift({ ...message, since: new Date() });
		// render
		this.open();
	}
}

let entries = [] as Message[];

function Overlay(props: Readonly<{ msgs: Message[]; clamp: number }>) {
	return (
		<div className="fixed bottom-[15px] right-[15px]">
			<div className="flex flex-col gap-[16px] rounded-[10px] bg-[#CED8D5] px-[20px] py-[20px]">
				<div className="flex items-center justify-between text-xl font-bold">
					알림
					<Image src="/icons/close.svg" alt="close" width={24} height={24} onClick={() => Notification.close()} />
				</div>
				<div className="flex flex-col gap-[8px]">
					{props.clamp < props.msgs.length && (
						<div className="flex w-[330px] items-center justify-center rounded-[5px] bg-gray-200 px-[12px] py-[16px]">
							{props.msgs.length - props.clamp}개의 읽지 않은 알림이 더 있습니다.
						</div>
					)}
					{props.msgs.length === 0 && (
						<div className="flex w-[330px] items-center justify-center rounded-[5px] bg-gray-200 px-[12px] py-[16px]">읽지 않은 알림이 없습니다.</div>
					)}
					{props.msgs.slice(0, props.clamp).map((msg, index) => (
						<Message key={index} msg={msg} />
					))}
				</div>
			</div>
		</div>
	);
}

const LOCALE = {
	year: "년",
	month: "달",
	day: "일",
	hour: "시간",
	minute: "분",
	second: "초",
};

function Message({ msg }: Readonly<{ msg: Message }>) {
	const interval = useRef<NodeJS.Timeout>();

	const [elpased, setElapsed] = useState(new Date());

	useEffect(() => {
		setTimeout(() => {
			interval.current = setInterval(() => {
				setElapsed(new Date());
			}, 1000);
		}, 1000 - new Date().getMilliseconds());

		return () => clearInterval(interval.current);
	}, []);

	return (
		<div className="flex w-[330px] flex-col gap-[4px] rounded-[5px] bg-white px-[12px] py-[16px]">
			<div className="flex justify-between text-md font-normal">
				{msg.content}
				<Image src="/icons/close.svg" alt="close" width={24} height={24} onClick={(event) => Notification.read(msg.id)} />
			</div>
			<div className="text-xs font-normal text-[#A4A1AA]">{countdown(msg.since, elpased, LOCALE)} 전</div>
		</div>
	);
}

function countdown(from: Date, until: Date, { year = "", month = "", day = "", hour = "", minute = "", second = "" }) {
	const diffTime = until.getTime() - from.getTime();

	if (diffTime < 0) {
		return 0 + second;
	}

	const diffDate = new Date(diffTime);

	const years = diffDate.getUTCFullYear() - 1970;
	const months = diffDate.getUTCMonth();
	const days = diffDate.getUTCDate() - 1;
	const hours = diffDate.getUTCHours();
	const minutes = diffDate.getUTCMinutes();
	const seconds = diffDate.getUTCSeconds();

	const stamp = [];

	if (years > 0) {
		stamp.push(years + year);
	}
	if (months > 0) {
		stamp.push(months + month);
	}
	if (days > 0) {
		stamp.push(days + day);
	}
	if (hours > 0) {
		stamp.push(hours + hour);
	}
	if (minutes > 0) {
		stamp.push(minutes + minute);
	}
	stamp.push(seconds + second);

	return stamp.join("\u0020");
}
