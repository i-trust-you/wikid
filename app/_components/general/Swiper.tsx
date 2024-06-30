import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Swiper(props: Readonly<React.PropsWithChildren & { gap: number; columns: number; sensitivity: number }>) {
	const [width, setWidth] = useState(0);

	const self = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		setWidth(self.current?.getBoundingClientRect().width ?? 0);
	}, [props.gap, props.columns, props.children]);

	useEffect(() => {
		function handle() {
			setWidth(self.current?.getBoundingClientRect().width ?? 0);
		}
		document.addEventListener("resize", handle);
		return () => document.removeEventListener("resize", handle);
	}, []);

	const [offset, setOffset] = useState(0);

	const [totalWidth, setTotalWidth] = useState(0);

	useEffect(() => {
		setTotalWidth((width / props.columns) * Children.count(props.children));
	}, [width, props.columns, props.children]);

	const [index, setIndex] = useState(0);

	// console.log(width, (width / props.columns) * Children.count(props.children));
	const [downX, setDownX] = useState<number>(NaN);
	//
	// handlers
	//
	function handle_down(value: number) {
		setDownX(value + offset);
	}
	const handle_move = useCallback(
		(value: number) => {
			const delta = downX - value;

			if ((index === 0 && delta <= 0) || (index === Children.count(props.children) - props.columns && 0 <= delta)) return;

			const ratio = delta / (width / props.columns);

			if (Math.abs(ratio) <= props.sensitivity) {
				setOffset(delta);
			}
		},
		[downX, index, props.children, props.columns, props.sensitivity, width],
	);
	const handle_up = useCallback(
		(value: number) => {
			setDownX(NaN);

			if ((index === 0 && offset <= 0) || (index === Children.count(props.children) - props.columns && 0 <= offset)) return;

			const ratio = offset / (width / props.columns);
			if (Math.abs(ratio) <= props.sensitivity) setIndex(index + (0 < ratio ? 1 : -1));

			setOffset(0);
		},
		[index, offset, props.children, props.columns, props.sensitivity, width],
	);

	useEffect(() => {
		if (!isNaN(downX)) {
			const handle = (event: MouseEvent) => {
				handle_move(event.clientX);
			};
			window.addEventListener("mousemove", handle);
			return () => window.removeEventListener("mousemove", handle);
		}
	}, [downX, handle_move]);

	useEffect(() => {
		if (!isNaN(downX)) {
			const handle = (event: MouseEvent) => {
				handle_up(event.clientX);
			};
			window.addEventListener("mouseup", handle);
			return () => window.removeEventListener("mouseup", handle);
		}
	}, [downX, handle_up]);

	return (
		<div
			ref={self}
			className="h-full w-full overflow-hidden"
			onMouseDown={(event) => handle_down(event.clientX)}
			onTouchStart={(event) => handle_down(event.touches[0].clientX)}
			onTouchMove={(event) => handle_move(event.changedTouches[0].clientX)}
			onTouchEnd={(event) => handle_up(event.changedTouches[0].clientX)}
		>
			<div
				className="flex h-full transition-transform [&>*]:grow"
				style={{ gap: props.gap, width: totalWidth, transform: `translateX(-${(width / props.columns) * index + offset}px)` }}
			>
				{props.children}
			</div>
		</div>
	);
}
