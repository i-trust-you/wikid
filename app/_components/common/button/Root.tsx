"use client";

import { MouseEvent, PropsWithChildren, createContext, useContext } from "react";

interface ButtonContextProps extends PropsWithChildren {
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	type?: "button" | "reset" | "submit";
	href?: string;
	disabled?: boolean;
}

const ButtonContext = createContext<ButtonContextProps>({
	onClick: () => {},
	type: "button",
	disabled: false,
	children: "",
});

export const useButtonContext = () => {
	const context = useContext(ButtonContext);
	if (!context) throw Error("(!) Button 컨텍스트를 호출할 수 없는 범위입니다.");
	return context;
};

const Root: React.FC<ButtonContextProps> = ({ children, onClick, type, href, disabled }) => {
	const contextValue = {
		onClick,
		type,
		href,
		disabled,
	};

	return <ButtonContext.Provider value={contextValue}>{children}</ButtonContext.Provider>;
};

export default Root;
