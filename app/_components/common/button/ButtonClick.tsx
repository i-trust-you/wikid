"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

import { useButtonContext } from "./Root";

interface ButtonProps extends PropsWithChildren {}

const ButtonClick: React.FC<ButtonProps> = ({ children }) => {
	const { href, onClick, type, disabled } = useButtonContext();

	let buttonClasses = "relative h-full w-full gap-[10px] rounded-[10px] text-md font-semibold border";

	if (disabled) {
		buttonClasses += " opacity-50 cursor-not-allowed";
	} else {
		buttonClasses += " cursor-pointer";
	}

	switch (type) {
		case "button":
		case "submit":
			buttonClasses += " bg-primary-200 text-white";
			break;
		case "reset":
			buttonClasses += " bg-white border-primary-200 text-primary-200";
			break;
		default:
			buttonClasses += " bg-red-200 text-white";
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
