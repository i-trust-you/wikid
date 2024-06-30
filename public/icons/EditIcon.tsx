interface IconProps {
	width: string;
	height: string;
	color?: string;
}

export default function EditIcon({ width, height, color = "#8F95B2" }: IconProps) {
	return (
		<svg width={width} height={height} viewBox={[0, 0, width, height].join("\u0020")} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.99997 19H6.2615L16.4981 8.7634L15.2366 7.50188L4.99997 17.7385V19ZM4.40385 20.5C4.14777 20.5 3.93311 20.4133 3.75987 20.2401C3.58662 20.0668 3.5 19.8522 3.5 19.5961V17.8635C3.5 17.6196 3.5468 17.3871 3.6404 17.1661C3.73398 16.9451 3.86282 16.7526 4.02692 16.5885L16.6904 3.93078C16.8416 3.79343 17.0086 3.68729 17.1913 3.61237C17.374 3.53746 17.5656 3.5 17.7661 3.5C17.9666 3.5 18.1608 3.53558 18.3488 3.60675C18.5368 3.6779 18.7032 3.79103 18.848 3.94615L20.0692 5.18268C20.2243 5.32754 20.3349 5.49424 20.4009 5.68278C20.4669 5.87129 20.5 6.05981 20.5 6.24833C20.5 6.44941 20.4656 6.64131 20.3969 6.82403C20.3283 7.00676 20.219 7.17373 20.0692 7.32495L7.41147 19.973C7.24738 20.1371 7.05483 20.266 6.83383 20.3596C6.61281 20.4532 6.38037 20.5 6.1365 20.5H4.40385ZM15.8563 8.1437L15.2366 7.50188L16.4981 8.7634L15.8563 8.1437Z"
				fill={color}
			/>
		</svg>
	);
}