import Link from "next/link";
import { MouseEvent, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
	href?: string;
	style?: "basic" | "outline" | "cancel";
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, href, style = "basic", onClick, disabled }) => {
	let buttonStyle = "";

	switch (style) {
		case "basic":
			buttonStyle = "bg-primary-200 text-white";
			break;
		case "outline":
			buttonStyle = "bg-white border border-primary-200 text-primary-200";
			break;
		case "cancel":
			buttonStyle = "bg-red-200 text-white";
			break;
	}

	return href ? (
		<Link
			href={href}
			className={`${disabled ? `cursor-default border-none bg-gray-300 text-white` : `${buttonStyle}`} flex h-full w-full cursor-pointer items-center justify-center rounded-[10px] px-5 py-2 text-md font-semibold`}
		>
			{children}
		</Link>
	) : (
		<button
			onClick={onClick}
			className={`${buttonStyle} h-full w-full cursor-pointer rounded-[10px] px-5 py-2 text-md font-semibold disabled:cursor-default disabled:border-none disabled:bg-gray-300 disabled:text-white`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
