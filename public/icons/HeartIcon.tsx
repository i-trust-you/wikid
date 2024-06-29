interface IconProps {
	width: string;
	height: string;
	color?: string;
}

export default function HeartIcon({ width, height, color = "#8F95B2" }: IconProps) {
	return (
		<svg width={width} height={height} viewBox={[0, 0, width, height].join("\u0020")} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M11.9904 19.7099C11.7763 19.7099 11.5612 19.6715 11.3452 19.5945C11.1291 19.5176 10.9391 19.3971 10.775 19.233L9.33848 17.9273C7.56539 16.3106 5.98238 14.7225 4.58943 13.1628C3.19648 11.6032 2.5 9.9324 2.5 8.15037C2.5 6.73115 2.97852 5.54302 3.93558 4.58597C4.89263 3.62892 6.08076 3.15039 7.49998 3.15039C8.30638 3.15039 9.10285 3.33629 9.8894 3.70809C10.6759 4.07989 11.3795 4.68374 12 5.51964C12.6205 4.68374 13.324 4.07989 14.1105 3.70809C14.8971 3.33629 15.6936 3.15039 16.5 3.15039C17.9192 3.15039 19.1073 3.62892 20.0644 4.58597C21.0214 5.54302 21.5 6.73115 21.5 8.15037C21.5 9.95163 20.7916 11.6411 19.375 13.2186C17.9583 14.7962 16.3788 16.3709 14.6365 17.9426L13.2154 19.233C13.0513 19.3971 12.8596 19.5176 12.6404 19.5945C12.4211 19.6715 12.2045 19.7099 11.9904 19.7099ZM11.2808 7.03884C10.7397 6.21447 10.1702 5.61031 9.5721 5.22634C8.97402 4.84236 8.28331 4.65037 7.49998 4.65037C6.49998 4.65037 5.66664 4.9837 4.99998 5.65037C4.33331 6.31703 3.99998 7.15037 3.99998 8.15037C3.99998 8.95293 4.25863 9.79203 4.77593 10.6677C5.29323 11.5433 5.94257 12.4138 6.72398 13.2792C7.50539 14.1446 8.35187 14.9901 9.2634 15.8157C10.1749 16.6413 11.0198 17.4087 11.798 18.1177C11.8557 18.169 11.923 18.1946 12 18.1946C12.0769 18.1946 12.1442 18.169 12.2019 18.1177C12.9801 17.4087 13.825 16.6413 14.7366 15.8157C15.6481 14.9901 16.4946 14.1446 17.276 13.2792C18.0574 12.4138 18.7067 11.5433 19.224 10.6677C19.7413 9.79203 20 8.95293 20 8.15037C20 7.15037 19.6666 6.31703 19 5.65037C18.3333 4.9837 17.5 4.65037 16.5 4.65037C15.7166 4.65037 15.0259 4.84236 14.4279 5.22634C13.8298 5.61031 13.2602 6.21447 12.7192 7.03884C12.6346 7.16704 12.5282 7.2632 12.4 7.32732C12.2718 7.39142 12.1384 7.42347 12 7.42347C11.8615 7.42347 11.7282 7.39142 11.6 7.32732C11.4718 7.2632 11.3654 7.16704 11.2808 7.03884Z"
				fill={color}
			/>
		</svg>
	);
}
