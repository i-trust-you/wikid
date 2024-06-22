import { Overlay } from "@/_utilities/Overlay";
import Image from "next/image";

export default class Modal extends Overlay {
	private readonly onClickOutSide: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	private timeout?: NodeJS.Timeout;

	constructor(
		protected readonly children: JSX.Element,
		onClickOutSide: (modal: Modal) => void,
	) {
		super(children);

		this.onClickOutSide = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (event.target === event.currentTarget) {
				onClickOutSide(this);
			}
		};
	}

	override selector() {
		return "#modal";
	}

	public shake() {
		const puppet = document.querySelector("#puppet");

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
		super.open();
		// prevent scroll
		document.body.style.setProperty("overflow", "hidden");
	}

	override close() {
		super.close();
		// allow scroll
		document.body.style.setProperty("overflow", null);
	}

	override render() {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-[#474D664D]" onClick={this.onClickOutSide}>
				<div id="puppet" className="bg-white w-[335px] rounded-[10px] border-[1.5px] border-solid px-[20px] py-[20px] shadow-lg tablet:w-[395px]">
					<div className="flex flex-row-reverse">
						<Image
							className="aspect-square rounded-full px-[2.5px] py-[2.5px]"
							src="/icons/close.svg"
							alt="close"
							width={30}
							height={30}
							onClick={this.close}
						></Image>
					</div>
					<div className="mt-[20px]">{this.children}</div>
				</div>
			</div>
		);
	}
}
