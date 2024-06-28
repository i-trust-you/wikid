import { FC, PropsWithChildren } from "react";

const Label: FC<PropsWithChildren> = ({ children }) => {
	return <label>{children}</label>;
};

export default Label;
