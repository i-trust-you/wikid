"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

import { useButtonContext } from "./Root";

interface ButtonProps extends PropsWithChildren {}

const ButtonClick: React.FC<ButtonProps> = ({ children }) => {
	const { href, onClick, type, disabled } = useButtonContext();
	}

	return href ? (
		<Link href={href}>
			<button type={type} onClick={onClick} disabled={disabled} className={buttonClasses}>
				{children}
			</button>
		</Link>
	) : (
		<button type={type} onClick={onClick} disabled={disabled} className={buttonClasses}>
			{children}
		</button>
	);
};

export default ButtonClick;
