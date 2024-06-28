"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";


export default function Popover(
	props: Readonly<
		React.PropsWithChildren & {
			gap: number;
			placement: "top" | "left" | "right" | "bottom";
			element: React.PropsWithChildren["children"];
		}
	>,
) {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const overlay = useRef<HTMLDivElement>(null);

		const [toggle, setToggle] = useState(false);

	useLayoutEffect(() => {
		const rect = overlay.current?.getBoundingClientRect();
		setWidth(rect?.width ?? 0);
		setHeight(rect?.height ?? 0);
	}, [toggle, props.children]);

	const getTop = useCallback(() => {
		switch (props.placement) {
			case "top": {
				return -height - props.gap;
			}
			case "left":
			case "right": {
				return "25%";
			}
		}
	}, [props.gap, props.placement, height]);

	const getLeft = useCallback(() => {
		switch (props.placement) {
			case "top":
			case "bottom": {
				return "25%";
			}
			case "left": {
				return -width - props.gap;
			}
		}
	}, [props.gap, props.placement, width]);

	const getRight = useCallback(() => {
		switch (props.placement) {
			case "right": {
				return -width - props.gap;
			}
		}
	}, [props.gap, props.placement, width]);

	const getBottom = useCallback(() => {
		switch (props.placement) {
			case "bottom": {
				return -height - props.gap;
			}
		}
	}, [props.gap, props.placement, height]);

	return (
		<div className="relative" onClick={() => setToggle(!toggle)}>
			{props.children}
			{/* @ts-ignore */}
			<div ref={overlay} className="absolute" style={{ display: !toggle && "none", top: getTop(), left: getLeft(), right: getRight(), bottom: getBottom() }}>
				{props.element}
			</div>
		</div>
	);
}
