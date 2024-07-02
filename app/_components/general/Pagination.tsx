import capsule from "@/_utilities/capsule";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import ArrowLeftIcon from "../../../public/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../public/icons/ArrowRightIcon";

interface Props {
	page: number;
	clamp: number;
	length: number;
	onChange: (page: number) => void;
}

interface State {
	page: ReturnType<typeof capsule<number>>;
}

// @ts-ignore
const CTX = createContext<{ props: Omit<Props, "onChange">; state: State }>();

function useCTX() {
	const ctx = useContext(CTX);

	if (!ctx) throw new Error();

	return ctx;
}

// TODO: pass id, class, style
export default function Pagination(props: Readonly<React.PropsWithChildren & Props>) {
	const [page, setPage] = useState(props.page);

	useEffect(() => {
		props.onChange(page);
	}, [page]);

	const children = useMemo(() => {
		// early return
		if (props.children) return props.children;

		return (
			<div className="flex gap-[15px] [&_button:disabled]:border-primary-200 [&_button:disabled]:bg-primary-100 [&_button:disabled]:text-primary-200 [&_button:not(:disabled)]:bg-white [&_button:not(:disabled)]:text-gray-400 hover:[&_button:not(:disabled)]:text-primary-200 [&_button]:flex [&_button]:aspect-square [&_button]:w-[40px] [&_button]:items-center [&_button]:justify-center [&_button]:rounded-[10px] [&_button]:border [&_button]:border-transparent [&_button]:text-xs [&_button]:font-normal [&_button]:shadow-[0_4px_20px_-0px_rgba(0,0,0,0.1)] tablet:[&_button]:w-[45px] tablet:[&_button]:text-2lg">
				<Pagination.Jump to="prev">
					<ArrowLeftIcon width="24" height="24" />
				</Pagination.Jump>
				<Pagination.Generator>
					{(page) => (
						<Pagination.Jump key={page} to={page}>
							{page + 1}
						</Pagination.Jump>
					)}
				</Pagination.Generator>
				<Pagination.Jump to="next">
					<ArrowRightIcon width="24" height="24" />
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
					page: capsule(() => page, (value: number) => setPage(Math.min(Math.max(0, value), props.length - 1))),
				},
			}}
		>
			<div>{children}</div>
		</CTX.Provider>
	);
}

Pagination.Jump = function $(props: Readonly<React.PropsWithChildren & { to: "first" | "prev" | number | "next" | "last" }>) {
	const ctx = useCTX();

	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		// prettier-ignore
		return setDisabled( props.to === "first" || props.to === "prev" ? ctx.state.page() === 0 : props.to === "next" || props.to === "last" ? ctx.state.page() === ctx.props.length - 1 : ctx.state.page() === props.to);
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

Pagination.Generator = function $(props: Readonly<{ children: (page: number) => JSX.Element }>) {
	const ctx = useCTX();

	const offset = Math.floor(ctx.state.page() / ctx.props.clamp) * ctx.props.clamp;

	return <>{new Array(Math.min(ctx.props.clamp, ctx.props.length - offset)).fill(null).map((_, index) => props.children(index + offset))}</>;
};
