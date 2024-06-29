interface IconProps {
	width: string;
	height: string;
	color?: string;
}

export default function ArrowLeftIcon({ width, height, color = "#8F95B2" }: IconProps) {
	return (
		<svg width={width} height={height} viewBox={[0, 0, width, height].join("\u0020")} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.83825 12.4997C9.83825 12.3791 9.85748 12.267 9.89595 12.1631C9.93442 12.0593 10.0004 11.9606 10.094 11.867L14.5883 7.37276C14.7267 7.23429 14.9007 7.16346 15.1104 7.16026C15.32 7.15704 15.4972 7.22788 15.6421 7.37276C15.7869 7.51763 15.8594 7.69326 15.8594 7.89966C15.8594 8.10606 15.7869 8.28169 15.6421 8.42656L11.569 12.4997L15.6421 16.5728C15.7805 16.7112 15.8514 16.8852 15.8546 17.0949C15.8578 17.3045 15.7869 17.4817 15.6421 17.6266C15.4972 17.7714 15.3216 17.8439 15.1151 17.8439C14.9088 17.8439 14.7331 17.7714 14.5883 17.6266L10.094 13.1323C10.0004 13.0388 9.93442 12.94 9.89595 12.8362C9.85748 12.7324 9.83825 12.6202 9.83825 12.4997Z"
				fill={color}
			/>
		</svg>
	);
}
