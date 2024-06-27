import { Overlay } from "@/_utilities/Overlay";
import Image from "next/image";
import ReactDOM from "react-dom/client";

export default class Toast extends Overlay {
	private static message?: string;
	private static timeout?: NodeJS.Timeout;

	static render(children: React.PropsWithChildren["children"]) {
		setTimeout(() => {
			const puppet = Toast.dom?.querySelector("[data-puppet]") as HTMLElement;

			if (!puppet) throw new Error();

			Toast.timeout = clearTimeout(Toast.timeout) as undefined;

			puppet.style.setProperty("transform", "translateY(100px)");

			Toast.timeout = setTimeout(() => puppet.style.setProperty("transform", "translateY(-100px)"), 1000);
		});
		Overlay.render("#toast", children);
	}

	public static info(content: string) {
		this.render(
			<div className="fixed inset-x-0 top-0 flex items-center justify-center">
				<div
					data-puppet
					className="flex h-[50px] translate-y-[-100px] gap-[15px] rounded-[10px] border border-purple bg-gray-100 px-[20px] py-[13px] text-md font-semibold text-purple transition-transform"
				>
					<Image src="icons/check.svg" alt="icon" width={20} height={20} />
					{content}
				</div>
			</div>,
		);
	}

	public static error(content: string) {
		this.render(
			<div className="fixed inset-x-0 top-0 flex items-center justify-center">
				<div
					data-puppet
					className="flex h-[50px] translate-y-[-100px] gap-[15px] rounded-[10px] border border-red-200 bg-red-100 px-[20px] py-[13px] text-md font-semibold text-red-200 transition-transform"
				>
					<Image src="icons/check.svg" alt="icon" width={20} height={20} />
					{content}
				</div>
			</div>,
		);
	}

	public static warning(content: string) {
		this.render(
			<div className="fixed inset-x-0 top-0 flex items-center justify-center">
				<div
					data-puppet
					className="flex h-[50px] translate-y-[-100px] gap-[15px] rounded-[10px] border border-yellow bg-gray-100 px-[20px] py-[13px] text-md font-semibold text-yellow transition-transform"
				>
					<Image src="icons/check.svg" alt="icon" width={20} height={20} />
					{content}
				</div>
			</div>,
		);
	}

	public static success(content: string) {
		this.render(
			<div className="fixed inset-x-0 top-0 flex items-center justify-center">
				<div
					data-puppet
					className="flex h-[50px] translate-y-[-100px] gap-[15px] rounded-[10px] border border-primary-200 bg-primary-100 px-[20px] py-[13px] text-md font-semibold text-primary-200 transition-transform"
				>
					<Image src="icons/check.svg" alt="icon" width={20} height={20} />
					{content}
				</div>
			</div>,
		);
	}
}
