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
			buttonStyle = "bg-primary-200 text-white hover:bg-primary-300 active:bg-primary-400";
			break;
		case "outline":
			buttonStyle =
				"bg-white border border-primary-200 text-primary-200 hover:border-primary-300 hover:text-primary-300 active:text-primary-400 hover:bg-gray-100 active:bg-gray-200";
			break;
		case "cancel":
			buttonStyle = "bg-red-200 text-white hover:bg-red-300 active:bg-red-400";
			break;
	}

	return href ? (
		<Link
			href={href}
			className={`${disabled ? `cursor-default border-none bg-gray-300 text-white transition` : `${buttonStyle}`} flex h-full w-full cursor-pointer items-center justify-center rounded-[10px] px-5 py-2 text-md font-semibold`}
		>
			{children}
		</Link>
	) : (
		<button
			onClick={onClick}
			className={`${buttonStyle} h-full w-full cursor-pointer rounded-[10px] px-5 py-2 text-md font-semibold transition disabled:cursor-default disabled:border-none disabled:bg-gray-300 disabled:text-white`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
