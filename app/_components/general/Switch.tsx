import capsule from "@/_utilities/capsule";
import { Children, cloneElement, createContext, useContext, useState } from "react";


interface Context {
	index: ReturnType<typeof capsule<string>>;
}
// @ts-ignore
const CTX = createContext<Context>();

function useCTX() {
	const ctx = useContext(CTX);

	if (!ctx) throw new Error();

	return ctx;
}

export default function Switch(props: Readonly<React.PropsWithChildren & { case: string }>) {
	const [index, setIndex] = useState(props.case);

	return (
		<CTX.Provider
			value={{
				index: capsule(
					() => index,
					(_) => setIndex(_),
				),
			}}
		>
			{props.children}
		</CTX.Provider>
	);
}

Switch.Jump = function Jump(props: Readonly<React.PropsWithChildren & { to: string }>) {
	const ctx = useCTX();

	return <div onClick={() => ctx.index(props.to)}>{props.children}</div>;
};

Switch.Case = function Case(props: Readonly<React.PropsWithChildren & { of: string }>) {
	const ctx = useCTX();
	// @ts-ignore
	return <div style={{ display: ctx.index() !== props.of && "none" }}>{props.children}</div>;
};
