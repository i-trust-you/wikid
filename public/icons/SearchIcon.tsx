interface IconProps {
	width: string;
	height: string;
	color?: string;
}

export default function SearchIcon({ width, height, color = "#8F95B2" }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M11 18C12.9333 18 14.5833 17.3192 15.95 15.9577C17.3166 14.5961 18 12.9436 18 11C18 9.06664 17.3166 7.41664 15.95 6.04998C14.5833 4.68331 12.9333 3.99998 11 3.99998C9.05639 3.99998 7.40383 4.68331 6.04228 6.04998C4.68074 7.41664 3.99998 9.06664 3.99998 11C3.99998 12.9436 4.68074 14.5961 6.04228 15.9577C7.40383 17.3192 9.05639 18 11 18ZM11 19.5C9.82049 19.5 8.71537 19.2769 7.6846 18.8307C6.65383 18.3846 5.75512 17.7782 4.98845 17.0115C4.2218 16.2448 3.6154 15.3461 3.16925 14.3154C2.72308 13.2846 2.5 12.1795 2.5 11C2.5 9.83074 2.72308 8.73075 3.16925 7.7C3.6154 6.66923 4.2218 5.76795 4.98845 4.99615C5.75512 4.22437 6.65383 3.6154 7.6846 3.16925C8.71537 2.72308 9.82049 2.5 11 2.5C12.1692 2.5 13.2692 2.72308 14.3 3.16925C15.3307 3.6154 16.232 4.22437 17.0038 4.99615C17.7756 5.76795 18.3846 6.66923 18.8307 7.7C19.2769 8.73075 19.5 9.83074 19.5 11C19.5 12.041 19.3233 13.0237 18.9701 13.9481C18.6169 14.8724 18.1288 15.7102 17.5057 16.4615L20.9827 19.9385C21.1314 20.0872 21.2016 20.2596 21.1932 20.4557C21.1849 20.6519 21.1064 20.8243 20.9577 20.973C20.8089 21.1115 20.6349 21.1807 20.4356 21.1807C20.2362 21.1807 20.0622 21.1115 19.9135 20.973L16.4461 17.5211C15.6948 18.1442 14.857 18.6297 13.9327 18.9778C13.0083 19.3259 12.0307 19.5 11 19.5Z"
				fill={color}
			/>
		</svg>
	);
}
