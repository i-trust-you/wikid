"use client";

import { cloneElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Popover(
	props: Readonly<
		React.PropsWithChildren & {
			gap: number;
			trigger: "click" | "hover";
			position:
				| "top"
				| "left"
				| "top-right-top-left"
				| "top-right-bottom-left"
				| "bottom-right-top-left"
				| "bottom-right-bottom-left"
				| "right"
				| "top-left-top-right"
				| "top-left-bottom-right"
				| "bottom-left-top-right"
				| "bottom-left-bottom-right"
				| "bottom"
				| "top-left-bottom-left"
				| "top-right-bottom-right";
			overlay: JSX.Element;
		}
	>,
) {
	const pop = useRef<HTMLDivElement>(null);
	const over = useRef<HTMLDivElement>(null);

	const [popWidth, setPopWidth] = useState(0);
	const [popHeight, setPopHeight] = useState(0);

	const [overWidth, setOverWidth] = useState(0);
	const [overHeight, setOverHeight] = useState(0);

	const [toggle, setToggle] = useState(false);

	useLayoutEffect(() => {
		if (toggle) {
			const rect = pop.current?.getBoundingClientRect();
			setPopWidth(rect?.width ?? 0);
			setPopHeight(rect?.height ?? 0);
		}
	}, [toggle, props.children]);

	useLayoutEffect(() => {
		if (toggle) {
			const rect = over.current?.getBoundingClientRect();
			setOverWidth(rect?.width ?? 0);
			setOverHeight(rect?.height ?? 0);
		}
	}, [toggle, props.children]);

	const getTop = useCallback(() => {
		switch (props.position) {
			case "top":
			case "bottom-right-top-left":
			case "bottom-left-top-right": {
				return -overHeight - props.gap;
			}
			case "left":
			case "right": {
				return (popHeight - overHeight) / 2;
			}
			case "top-right-top-left":
			case "top-left-top-right": {
				return 0;
			}
		}
	}, [props.gap, props.position, overHeight, popHeight]);

	const getLeft = useCallback(() => {
		switch (props.position) {
			case "top":
			case "bottom": {
				return (popWidth - overWidth) / 2;
			}
			case "left":
			case "top-right-top-left":
			case "top-right-bottom-left":
			case "bottom-right-top-left":
			case "bottom-right-bottom-left": {
				return -overWidth - props.gap;
			}
			case "top-left-bottom-left": {
				return 0;
			}
		}
	}, [props.gap, props.position, popWidth, overWidth]);

	const getRight = useCallback(() => {
		switch (props.position) {
			case "right":
			case "top-left-top-right":
			case "top-left-bottom-right":
			case "bottom-left-top-right":
			case "bottom-left-bottom-right": {
				return -overWidth - props.gap;
			}
			case "top-right-bottom-right": {
				return 0;
			}
		}
	}, [props.gap, props.position, overWidth]);

	const getBottom = useCallback(() => {
		switch (props.position) {
			case "bottom":
			case "top-left-bottom-right":
			case "top-left-bottom-left":
			case "top-right-bottom-right": {
				return -overHeight - props.gap;
			}
			case "bottom-right-bottom-left":
			case "bottom-left-bottom-right": {
				return 0;
			}
		}
	}, [props.gap, props.position, overHeight]);

	useEffect(() => {
		if (toggle) {
			switch (props.trigger) {
				case "click": {
					const handle = () => {
						setToggle(false);
					};
					document.addEventListener("click", handle);
					return () => document.removeEventListener("click", handle);
					break;
				}
			}
		}
	}, [toggle, props.trigger]);

	const timeout = useRef<NodeJS.Timeout>();

	const onMouseEnter = useCallback(
		(event: React.MouseEvent) => {
			if (props.trigger === "hover") {
				setToggle(true);
				timeout.current = clearTimeout(timeout.current) as undefined;
			}
		},
		[props.trigger],
	);

	const onMouseLeave = useCallback(
		(event: React.MouseEvent) => {
			if (props.trigger === "hover") {
				timeout.current = setTimeout(() => setToggle(false), 500);
			}
		},
		[props.trigger],
	);

	return (
		<div ref={pop} className="relative" onClick={() => props.trigger === "click" && setToggle(!toggle)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			{props.children}
			{cloneElement(props.overlay, {
				ref: over,
				style: { zIndex: 69, position: "absolute", display: !toggle && "none", top: getTop(), left: getLeft(), right: getRight(), bottom: getBottom() },
			})}
		</div>
	);
}
