import { Overlay } from "@/_utilities/Overlay";
import Image from "next/image";

export default class Modal extends Overlay {
	// :3
	private timeout?: NodeJS.Timeout;

	// prettier-ignore
	constructor(protected readonly children: JSX.Element, protected readonly onClickOutSide: (modal: Modal) => void) {
		super(children);
	}

	protected declare static instance?: Modal;

	public static shake() {
		this.instance?.shake();
	}

	public static open() {
		this.instance?.open();
	}

	public static close() {
		this.instance?.close();
	}

	override selector() {
		return "#modal";
	}

	public shake() {
		const puppet = document.querySelector(this.selector())?.querySelector("[data-puppet]");

		if (!puppet) throw new Error();

		this.timeout = clearTimeout(this.timeout) as undefined;

		puppet.animate(
			[
				{ transform: "translate3d(-1px, 0, 0)", borderColor: "#D14343" }, // 0%
				{ transform: "translate3d(2px, 0, 0)", borderColor: "#D14343" }, // 10%
				{ transform: "translate3d(-4px, 0, 0)", borderColor: "#D14343" }, // 20%
				{ transform: "translate3d(4px, 0, 0)", borderColor: "#D14343" }, // 30%
				{ transform: "translate3d(-4px, 0, 0)", borderColor: "#D14343" }, // 60%
				{ transform: "translate3d(2px, 0, 0)", borderColor: "#D14343" }, // 70%
				{ transform: "translate3d(-1px, 0, 0)", borderColor: "#D14343" }, // 80%
				{ transform: "translate3d(0, 0, 0)", borderColor: "#D14343" }, // 100%
			],
			{ duration: 500, iterations: Infinity },
		);

		this.timeout = setTimeout(() => puppet.getAnimations().forEach((animation) => animation.cancel()), 750);
	}

	override open() {
		// ..!
		super.open();
		// prevent scroll
		document.body.style.setProperty("overflow", "hidden");
	}

	override close() {
		// ..!
		super.close();
		// allow scroll
		document.body.style.setProperty("overflow", null);
	}

	override render() {
		const handle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (event.target === event.currentTarget) {
				this.onClickOutSide(this);
			}
		};
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-[#474D664D]" onClick={handle}>
				<div data-puppet className="w-[335px] rounded-[10px] border-[1.5px] border-solid bg-white px-[20px] py-[20px] shadow-lg tablet:w-[395px]">
					<div className="flex flex-row-reverse">
						<Image
							className="aspect-square rounded-full px-[2.5px] py-[2.5px]"
							src="/icons/close.svg"
							alt="close"
							width={30}
							height={30}
							onClick={this.close}
						/>
					</div>
					<div className="mt-[20px]">{this.children}</div>
				</div>
			</div>
		);
	}
}
