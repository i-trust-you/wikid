import Link from "next/link";
import { MouseEvent, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
	href?: string;
	buttonStyle?: "basic" | "outline" | "cancel";
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, href, buttonStyle = "", onClick, disabled }) => {
	switch (buttonStyle) {
		case "outline":
			buttonStyle = "bg-white border-primary-200 text-primary-200";
			break;
		case "cancel":
			buttonStyle = "bg-red-200 text-white";
			break;
		default:
			buttonStyle = "bg-primary-200 text-white";
	}

	return href ? (
		<Link
			href={href}
			className={`${buttonStyle} absolute flex h-full w-full cursor-pointer items-center justify-center rounded-[10px] border text-md font-semibold disabled:border-none disabled:bg-gray-300`}
		>
			{children}
		</Link>
	) : (
		<button
			onClick={onClick}
			className={`${buttonStyle} absolute h-full w-full cursor-pointer rounded-[10px] border text-md font-semibold disabled:border-none disabled:bg-gray-300`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
