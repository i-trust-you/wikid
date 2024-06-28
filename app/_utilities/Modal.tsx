import Image from "next/image";
import ReactDOM from "react-dom/client";

export default class Modal {
	private static timeout?: NodeJS.Timeout;
	private static instance?: Modal;
	protected static dom?: HTMLElement;
	protected static root?: ReactDOM.Root;

	private static render(children: Readonly<React.PropsWithChildren["children"]>) {
		// prettier-ignore
		(this.root ??= ReactDOM.createRoot(this.dom ??= document.querySelector("#modal")!!))?.render(children);
	}

	protected readonly children: React.PropsWithChildren["children"];

	constructor(children: JSX.Element, onClickOutSide: (modal: Modal) => void) {
		this.children = (
			<div
				className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-[#474D664D]"
				onClick={(event) => {
					if (event?.target === event?.currentTarget) {
						onClickOutSide(this);
					}
				}}
			>
				<div data-puppet className="w-[335px] rounded-[10px] border-[1.5px] border-solid bg-white px-[20px] py-[20px] shadow-lg tablet:w-[395px]">
					<div className="flex flex-row-reverse">
						<Image
							className="aspect-square rounded-full px-[2.5px] py-[2.5px]"
							src="/icons/close.svg"
							alt="close"
							width={30}
							height={30}
							onClick={() => this.close()}
						/>
					</div>
					<div className="mt-[20px]">{children}</div>
				</div>
			</div>
		);
	}

	public static shake() {
		this.instance?.shake();
	}

	public static open() {
		this.instance?.open();
	}

	public static close() {
		this.instance?.close();
	}

	public shake() {
		if (Modal.instance !== this) return;

		const puppet = Modal.dom?.querySelector("[data-puppet]");

		if (!puppet) throw new Error();

		Modal.timeout = clearTimeout(Modal.timeout) as undefined;

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

		Modal.timeout = setTimeout(() => puppet.getAnimations().forEach((animation) => animation.cancel()), 750);
	}

	public open() {
		Modal.instance = this;

		Modal.render(this.children);
		// prevent scroll
		document.body.style.setProperty("overflow", "hidden");
	}

	public close() {
		if (Modal.instance !== this) return;

		Modal.render(null);
		// allow scroll
		document.body.style.setProperty("overflow", null);
	}
}
