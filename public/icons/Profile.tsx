interface IconProps {
	width: string;
	height: string;
	color?: string;
}

export default function Profile({ width, height, color = "#8F95B2" }: IconProps) {
	return (
		<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="16" cy="16" r="16" fill="#F7F7FA" />
			<path
				d="M16 0C7.1625 0 0 7.1625 0 16C0 24.8375 7.1625 32 16 32C24.8375 32 32 24.8375 32 16C32 7.1625 24.8375 0 16 0ZM16 8C18.4856 8 20.5 10.015 20.5 12.5C20.5 14.985 18.4875 17 16 17C13.515 17 11.5 14.985 11.5 12.5C11.5 10.015 13.5125 8 16 8ZM16 28C12.6919 28 9.69375 26.6544 7.51875 24.4819C8.53125 21.8687 11.0312 20 14 20H18C20.9713 20 23.4713 21.8675 24.4813 24.4819C22.3063 26.6562 19.3062 28 16 28Z"
				fill="#C6CADA"
			/>
		</svg>
	);
}
