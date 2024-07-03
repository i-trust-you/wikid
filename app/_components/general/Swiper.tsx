import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Swiper(props: Readonly<React.PropsWithChildren & { gap: number; columns: number; threshold: number }>) {
	const [width, setWidth] = useState(0);

	const self = useRef<HTMLDivElement>(null);
	const idk = useRef<HTMLDivElement>(null);

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
	function onDown(value: number) {
		setDownX(value);
	}
	const onMove = useCallback(
		(value: number) => {
			let delta = downX - value;

			if (0 < delta) {
				delta = Math.min(delta, (width / props.columns) * props.threshold);
				if (index === Children.count(props.children) - props.columns && 0 <= delta) delta = Math.min(delta, 0);
			} else {
				delta = Math.max(delta, (width / props.columns) * -props.threshold);
				if (index === 0 && delta <= 0) delta = Math.max(0, delta);
			}

			idk.current?.style.setProperty("transform", `translateX(${-((width / props.columns) * index + delta)}px)`);
		},
		[downX, index, props.children, props.columns, props.threshold, width],
	);

	const onUp = useCallback(
		(value: number) => {
			setDownX(NaN);

			idk.current?.style.setProperty("transform", `translateX(${-((width / props.columns) * index)}px)`);

			const delta = downX - value;

			console.log("ㅇㅇ", delta);

			if ((index === 0 && delta <= 0) || (index === Children.count(props.children) - props.columns && 0 <= delta)) return;

			const ratio = delta / (width / props.columns);

			if (Math.abs(ratio) >= props.threshold) {
				setIndex(index + (0 < ratio ? 1 : -1));
			}
		},
		[index, downX, props.children, props.columns, props.threshold, width],
	);

	useEffect(() => {
		if (!isNaN(downX)) {
			const handle = (event: MouseEvent) => {
				onMove(event.clientX);
			};
			window.addEventListener("mousemove", handle);
			return () => window.removeEventListener("mousemove", handle);
		}
	}, [downX, onMove]);

	useEffect(() => {
		if (!isNaN(downX)) {
			const handle = (event: MouseEvent) => {
				onUp(event.clientX);
			};
			window.addEventListener("mouseup", handle);
			return () => window.removeEventListener("mouseup", handle);
		}
	}, [downX, onUp]);

	return (
		<div
			ref={self}
			className="h-full w-full overflow-hidden"
			onMouseDown={(event) => onDown(event.clientX)}
			onTouchStart={(event) => onDown(event.touches[0].clientX)}
			onTouchMove={(event) => onMove(event.changedTouches[0].clientX)}
			onTouchEnd={(event) => onUp(event.changedTouches[0].clientX)}
		>
			<div
				ref={idk}
				className="flex h-full transition-transform [&>*]:grow"
				style={{ gap: props.gap, width: totalWidth, transform: `translateX(${-((width / props.columns) * index)}px)` }}
			>
				{props.children}
			</div>
		</div>
	);
}
