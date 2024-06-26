import Link from "next/link";
import { MouseEvent, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
	href?: string;
	type?: "button" | "submit" | "reset";
	style?: string;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, href, type, onClick, style, disabled }) => {
	let baseStyles = "relative h-full w-full gap-[10px] rounded-[10px] text-md font-semibold border disabled:cursor-not-allowed";
	switch (type) {
		case "button":
		case "submit":
			baseStyles += " bg-primary-200 text-white";
			break;
		case "reset":
			baseStyles += " bg-white border-primary-200 text-primary-200";
			break;
		default:
			baseStyles += " bg-red-200 text-white";
	}
	return href ? (
		<Link href={href} className={`${baseStyles} flex items-center justify-center ${style}`}>
			{children}
		</Link>
	) : (
		<button type={type} onClick={onClick} className={`${baseStyles} ${style}`} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
