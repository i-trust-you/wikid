interface IconProps {
	width: string;
	height: string;
	color?: string;
}

export default function AlignRightIcon({ width, height, color = "#8F95B2" }: IconProps) {
	return (
		<svg width={width} height={height} viewBox={[0, 0, width, height].join("\u0020")} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5 18V16.8333H19V18H5ZM9.84167 14.7917V13.625H19V14.7917H9.84167ZM5 11.5833V10.4167H19V11.5833H5ZM9.84167 8.375V7.20833H19V8.375H9.84167ZM5 5.16667V4H19V5.16667H5Z"
				fill={color}
			/>
		</svg>
	);
}
