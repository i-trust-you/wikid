import capsule from "@/_utilities/capsule";
import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface Props {
	page: number;
	clamp: number;
	length: number;
}

interface State {
	page: ReturnType<typeof capsule<number>>;
}

// @ts-ignore
const CTX = createContext<{ props: Props; state: State }>();

function useCTX() {
	const ctx = useContext(CTX);

	if (!ctx) throw new Error();

	return ctx;
}

// TODO: pass id, class, style
export default function Pagination(props: Readonly<React.PropsWithChildren & Props>) {
	const [page, set_page] = useState(props.page);

	const children = useMemo(() => {
		// early return
		if (props.children) return props.children;

		return (
			<div className="flex gap-[15px] [&_button:disabled]:border-primary-200 [&_button:disabled]:bg-primary-100 [&_button:disabled]:text-primary-200 [&_button:not(:disabled)]:bg-white [&_button:not(:disabled)]:text-gray-400 hover:[&_button:not(:disabled)]:text-primary-200 [&_button]:flex [&_button]:aspect-square [&_button]:w-[40px] [&_button]:items-center [&_button]:justify-center [&_button]:rounded-[10px] [&_button]:border [&_button]:border-transparent [&_button]:text-xs [&_button]:font-normal [&_button]:shadow-[0_4px_20px_-0px_rgba(0,0,0,0.1)] tablet:[&_button]:w-[45px] tablet:[&_button]:text-2lg">
				<Pagination.Jump to="prev">
					<Image src="/icons/arrow_left.svg" alt="prev" width={24} height={24} />
				</Pagination.Jump>
				<Pagination.Generator>
					{(key, page) => (
						<Pagination.Jump key={key} to={page}>
							{page + 1}
						</Pagination.Jump>
					)}
				</Pagination.Generator>
				<Pagination.Jump to="next">
					<Image src="/icons/arrow_right.svg" alt="next" width={24} height={24} />
				</Pagination.Jump>
			</div>
		);
	}, [props.children]);

	return (
		<CTX.Provider
			value={{
				props: {
					page: props.page,
					clamp: props.clamp,
					length: props.length,
				},
				state: {
					// prettier-ignore
					page: capsule(() => page, (value: number) => set_page(Math.min(Math.max(0, value), props.length - 1))),
				},
			}}
		>
			<div>{children}</div>
		</CTX.Provider>
	);
}

Pagination.Jump = function $(props: Readonly<React.PropsWithChildren & { to: "first" | "prev" | number | "next" | "last" }>) {
	const ctx = useCTX();

	const [disabled, set_disabled] = useState(false);

	useEffect(() => {
		// prettier-ignore
		return set_disabled( props.to === "first" || props.to === "prev" ? ctx.state.page() === 0 : props.to === "next" || props.to === "last" ? ctx.state.page() === ctx.props.length - 1 : ctx.state.page() === props.to);
	}, [ctx.props, ctx.state, props.to]);

	const handle = useCallback(() => {
		switch (props.to) {
			case "first": {
				ctx.state.page(-Infinity);
				break;
			}
			case "prev": {
				ctx.state.page(ctx.state.page() - 1);
				break;
			}
			case "next": {
				ctx.state.page(ctx.state.page() + 1);
				break;
			}
			case "last": {
				ctx.state.page(+Infinity);
				break;
			}
			default: {
				ctx.state.page(props.to);
				break;
			}
		}
	}, [ctx.state, props.to]);

	return (
		<button onClick={handle} disabled={disabled}>
			{props.children}
		</button>
	);
};

Pagination.Generator = function $(props: Readonly<{ children: (key: number, page: number) => JSX.Element }>) {
	const ctx = useCTX();

	return (
		<>
			{new Array(Math.min(ctx.props.length, ctx.props.clamp)).fill(null).map((_, index) => {
				// TODO: optimize logic & reuse cached value
				const page =
					index +
					(ctx.state.page() > Math.floor(ctx.props.clamp / 2) && ctx.props.length > ctx.props.clamp
						? Math.abs(ctx.state.page() - Math.floor(ctx.props.clamp / 2)) +
							(ctx.props.clamp + Math.abs(ctx.state.page() - Math.floor(ctx.props.clamp / 2)) > ctx.props.length
								? ctx.props.length - (ctx.props.clamp + Math.abs(ctx.state.page() - Math.floor(ctx.props.clamp / 2)))
								: 0)
						: 0);

				return props.children(index, page);
			})}
		</>
	);
};
