interface IconProps {
	width: string;
	height: string;
	color?: string;
}

export default function AlignCenterIcon({ width, height, color = "#8F95B2" }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5 18V16.8333H19V18H5ZM8.18889 14.7917V13.625H15.8306V14.7917H8.18889ZM5 11.5833V10.4167H19V11.5833H5ZM8.18889 8.375V7.20833H15.8306V8.375H8.18889ZM5 5.16667V4H19V5.16667H5Z"
				fill={color}
			/>
		</svg>
	);
}
