import ReactDOM from "react-dom/client";

const SECRET = crypto.randomUUID();

export abstract class Overlay {
	// lifecycle manager
	private static readonly lifecycle = new EventTarget();
	// Overlay container
	private static container?: ReactDOM.Root;
	// current Overlay
	private static instance?: Overlay;

	static {
		// @ts-ignore
		Overlay.lifecycle.addEventListener(SECRET, (event: CustomEvent) => {
			// render magic!
			(Overlay.container ??=
				(Overlay.instance = event.detail as typeof Overlay.instance) && ReactDOM.createRoot(document.querySelector(Overlay.instance.selector())!!))?.render(
				(Overlay.instance = event.detail as typeof Overlay.instance)?.render(),
			);
		});
	}

	public static open() {
		Overlay.instance?.open();
	}

	public static close() {
		Overlay.instance?.close();
	}

	constructor(protected readonly children: JSX.Element) {
		// TODO: none
	}

	protected abstract selector(): string;

	public open() {
		Overlay.lifecycle.dispatchEvent(new CustomEvent(SECRET, { detail: this }));
	}

	public close() {
		Overlay.lifecycle.dispatchEvent(new CustomEvent(SECRET, { detail: null }));
	}

	protected abstract render(): JSX.Element;
}
