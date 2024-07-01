import Image from "next/image";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

export default class Toast {
	protected static container?: ReactDOM.Root;

	private static render(children: Readonly<React.PropsWithChildren["children"]>) {
		// prettier-ignore
		(this.container ??= ReactDOM.createRoot(document.querySelector("#toast")!!))?.render(children);
	}

	public static info(message: string) {
		// prettier-ignore
		this.render(<Overlay><Overlay.Info message={message} /></Overlay>);
	}

	public static error(message: string) {
		// prettier-ignore
		this.render(<Overlay><Overlay.Error message={message} /></Overlay>);
	}

	public static warning(message: string) {
		// prettier-ignore
		this.render(<Overlay><Overlay.Warning message={message} /></Overlay>);
	}

	public static success(message: string) {
		// prettier-ignore
		this.render(<Overlay><Overlay.Success message={message} /></Overlay>);
	}
}

let timeout = undefined as NodeJS.Timeout | undefined;

function Overlay(props: Readonly<React.PropsWithChildren>) {
	const self = useRef<HTMLDivElement>(null);

	useEffect(() => {
		clearTimeout(timeout);
		setTimeout(() => self.current?.style.setProperty("transform", "translateY(100px)"))
		timeout = setTimeout(() => self.current?.style.setProperty("transform", "translateY(-100px)"), 1000);
	}, [props]);

	return (
		<div ref={self} className="fixed inset-x-0 top-0 flex translate-y-[-100px] items-center justify-center transition-transform">
			{props.children}
		</div>
	);
}

Overlay.Info = function Info(props: Readonly<{ message: string }>) {
	return (
		<div className="flex h-[50px] gap-[15px] rounded-[10px] border border-purple bg-gray-100 px-[20px] py-[13px] text-md font-semibold text-purple">
			<Image src="icons/check.svg" alt="icon" width={20} height={20} />
			{props.message}
		</div>
	);
};

Overlay.Error = function Error(props: Readonly<{ message: string }>) {
	return (
		<div className="flex h-[50px] gap-[15px] rounded-[10px] border border-red-200 bg-red-100 px-[20px] py-[13px] text-md font-semibold text-red-200">
			<Image src="icons/check.svg" alt="icon" width={20} height={20} />
			{props.message}
		</div>
	);
};

Overlay.Warning = function Warning(props: Readonly<{ message: string }>) {
	return (
		<div className="flex h-[50px] gap-[15px] rounded-[10px] border border-yellow bg-gray-100 px-[20px] py-[13px] text-md font-semibold text-yellow">
			<Image src="icons/check.svg" alt="icon" width={20} height={20} />
			{props.message}
		</div>
	);
};

Overlay.Success = function Success(props: Readonly<{ message: string }>) {
	return (
		<div className="flex h-[50px] gap-[15px] rounded-[10px] border border-primary-200 bg-primary-100 px-[20px] py-[13px] text-md font-semibold text-primary-200">
			<Image src="icons/check.svg" alt="icon" width={20} height={20} />
			{props.message}
		</div>
	);
};
