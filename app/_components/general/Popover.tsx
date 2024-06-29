"use client";

import { cloneElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";


export default function Popover(
	props: Readonly<
		React.PropsWithChildren & {
			gap: number;
			trigger: "click" | "hover";
			position: "top" | "left" | "right" | "bottom";
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
			case "top": {
				return -overHeight - props.gap;
			}
			case "left":
			case "right": {
				return (popHeight - overHeight) / 2;
			}
		}
	}, [props.gap, props.position, overHeight, popHeight]);

	const getLeft = useCallback(() => {
		switch (props.position) {
			case "top":
			case "bottom": {
				return (popWidth - overWidth) / 2;
			}
			case "left": {
				return -overWidth - props.gap;
			}
		}
	}, [props.gap, props.position, popWidth, overWidth]);

	const getRight = useCallback(() => {
		switch (props.position) {
			case "right": {
				return -overWidth - props.gap;
			}
		}
	}, [props.gap, props.position, overWidth]);

	const getBottom = useCallback(() => {
		switch (props.position) {
			case "bottom": {
				return -overHeight - props.gap;
			}
		}
	}, [props.gap, props.position, overHeight]);

	useEffect(() => {
		if (toggle) {
			switch (props.trigger) {
				case "click": {
					const handle = () =>
					{
						setToggle(false);
					};
					document.addEventListener("click", handle);
					return () => document.removeEventListener("click", handle);
					break;
				}
			}
		}
	}, [toggle, props.trigger]);

	return (
		<div
			ref={pop}
			className="relative"
			onClick={() => props.trigger === "click" && setToggle(!toggle)}
			onMouseEnter={() => props.trigger === "hover" && setToggle(true)}
			onMouseLeave={() => props.trigger === "hover" && setToggle(false)}
		>
			{props.children}
			{cloneElement(props.overlay, {
				ref: over,
				style: { position: "absolute", display: !toggle && "none", top: getTop(), left: getLeft(), right: getRight(), bottom: getBottom() },
			})}
		</div>
	);
}
