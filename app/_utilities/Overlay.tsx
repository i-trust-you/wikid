import ReactDOM from "react-dom/client";

export abstract class Overlay {
	protected static dom?: HTMLElement;
	protected static root?: ReactDOM.Root;

	protected static render(selector: string, children: React.PropsWithChildren["children"]) {
		// prettier-ignore
		(Overlay.root ??= ReactDOM.createRoot(Overlay.dom ??= document.querySelector(selector)!!))?.render(children);
	}
}
