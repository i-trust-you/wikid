interface IconProps {
	width: string;
	height: string;
	color?: string;
}

export default function ArrowDownIcon({ width, height, color = "#8F95B2" }: IconProps) {
	return (
		<svg width={width} height={height} viewBox={[0, 0, width, height].join("\u0020")} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M11.9997 14.6617C11.8791 14.6617 11.767 14.6425 11.6631 14.604C11.5593 14.5656 11.4606 14.4996 11.367 14.406L6.87276 9.91175C6.73429 9.7733 6.66346 9.59927 6.66026 9.38965C6.65704 9.18003 6.72788 9.00279 6.87276 8.85792C7.01763 8.71306 7.19326 8.64062 7.39966 8.64062C7.60606 8.64062 7.78169 8.71306 7.92656 8.85792L11.9997 12.931L16.0728 8.85792C16.2112 8.71947 16.3852 8.64864 16.5949 8.64542C16.8045 8.64222 16.9817 8.71306 17.1266 8.85792C17.2714 9.00279 17.3439 9.17843 17.3439 9.38485C17.3439 9.59125 17.2714 9.76688 17.1266 9.91175L12.6323 14.406C12.5388 14.4996 12.44 14.5656 12.3362 14.604C12.2324 14.6425 12.1202 14.6617 11.9997 14.6617Z"
				fill={color}
			/>
		</svg>
	);
}