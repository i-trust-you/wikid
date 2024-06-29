interface IconProps {
	width: string;
	height: string;
	color?: string;
}

export default function NumberingIcon({ width, height, color = "#8F95B2" }: IconProps) {
	return (
		<svg width={width} height={height} viewBox={[0, 0, width, height].join("\u0020")} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.09615 21.5C3.92393 21.5 3.78152 21.4437 3.66892 21.3312C3.55631 21.2186 3.5 21.0763 3.5 20.9043C3.5 20.7322 3.55631 20.5897 3.66892 20.4769C3.78152 20.3641 3.92393 20.3077 4.09615 20.3077H6V19.25H5.09615C4.92393 19.25 4.78152 19.1937 4.66892 19.0812C4.55631 18.9686 4.5 18.8263 4.5 18.6543C4.5 18.4822 4.55631 18.3397 4.66892 18.2269C4.78152 18.1141 4.92393 18.0577 5.09615 18.0577H6V17H4.09615C3.92393 17 3.78152 16.9437 3.66892 16.8312C3.55631 16.7186 3.5 16.5763 3.5 16.4043C3.5 16.2322 3.55631 16.0897 3.66892 15.9769C3.78152 15.8641 3.92393 15.8077 4.09615 15.8077H6.34615C6.5859 15.8077 6.78686 15.8887 6.94903 16.0509C7.11121 16.2131 7.1923 16.4141 7.1923 16.6538V17.8461C7.1923 18.0859 7.11121 18.2868 6.94903 18.449C6.78686 18.6112 6.5859 18.6923 6.34615 18.6923C6.5859 18.6923 6.78686 18.7733 6.94903 18.9355C7.11121 19.0977 7.1923 19.2987 7.1923 19.5384V20.6538C7.1923 20.8935 7.11121 21.0945 6.94903 21.2567C6.78686 21.4189 6.5859 21.5 6.34615 21.5H4.09615ZM4.1827 14.8461C3.99168 14.8461 3.83014 14.7801 3.69807 14.6481C3.56602 14.516 3.5 14.3545 3.5 14.1634V12.25C3.5 12.0102 3.58109 11.8093 3.74327 11.6471C3.90546 11.4849 4.10642 11.4038 4.34615 11.4038H6V10.3461H4.09615C3.92393 10.3461 3.78152 10.2899 3.66892 10.1773C3.55631 10.0648 3.5 9.92251 3.5 9.75043C3.5 9.57834 3.55631 9.43588 3.66892 9.32305C3.78152 9.21023 3.92393 9.15383 4.09615 9.15383H6.34615C6.5859 9.15383 6.78686 9.23492 6.94903 9.3971C7.11121 9.55928 7.1923 9.76024 7.1923 9.99998V11.75C7.1923 11.9897 7.11121 12.1907 6.94903 12.3529C6.78686 12.515 6.5859 12.5961 6.34615 12.5961H4.6923V13.6538H6.59615C6.76837 13.6538 6.91078 13.7101 7.0234 13.8226C7.136 13.9351 7.1923 14.0774 7.1923 14.2495C7.1923 14.4216 7.136 14.5641 7.0234 14.6769C6.91078 14.7897 6.76837 14.8461 6.59615 14.8461H4.1827ZM5.5966 8.1923C5.42452 8.1923 5.28207 8.136 5.16925 8.0234C5.05642 7.91078 5 7.76837 5 7.59615V3.6923H4.09615C3.92393 3.6923 3.78152 3.63604 3.66892 3.52353C3.55631 3.41099 3.5 3.26868 3.5 3.0966C3.5 2.92452 3.55631 2.78207 3.66892 2.66925C3.78152 2.55642 3.92393 2.5 4.09615 2.5H5.51923C5.71024 2.5 5.87018 2.56443 5.99903 2.69328C6.12788 2.82213 6.1923 2.98206 6.1923 3.17308V7.59615C6.1923 7.76837 6.13604 7.91078 6.02352 8.0234C5.91099 8.136 5.76868 8.1923 5.5966 8.1923ZM10.0577 18.75C9.84518 18.75 9.66705 18.6781 9.5233 18.5343C9.37957 18.3904 9.3077 18.2122 9.3077 17.9997C9.3077 17.7871 9.37957 17.609 9.5233 17.4654C9.66705 17.3218 9.84518 17.25 10.0577 17.25H19.75C19.9625 17.25 20.1406 17.3219 20.2843 17.4657C20.4281 17.6095 20.5 17.7877 20.5 18.0003C20.5 18.2129 20.4281 18.391 20.2843 18.5346C20.1406 18.6782 19.9625 18.75 19.75 18.75H10.0577ZM10.0577 12.75C9.84518 12.75 9.66705 12.6781 9.5233 12.5343C9.37957 12.3904 9.3077 12.2122 9.3077 11.9997C9.3077 11.7871 9.37957 11.609 9.5233 11.4654C9.66705 11.3218 9.84518 11.25 10.0577 11.25H19.75C19.9625 11.25 20.1406 11.3219 20.2843 11.4657C20.4281 11.6095 20.5 11.7877 20.5 12.0003C20.5 12.2129 20.4281 12.391 20.2843 12.5346C20.1406 12.6782 19.9625 12.75 19.75 12.75H10.0577ZM10.0577 6.74995C9.84518 6.74995 9.66705 6.67805 9.5233 6.53425C9.37957 6.39043 9.3077 6.21223 9.3077 5.99965C9.3077 5.78705 9.37957 5.60896 9.5233 5.46538C9.66705 5.32179 9.84518 5.25 10.0577 5.25H19.75C19.9625 5.25 20.1406 5.3219 20.2843 5.4657C20.4281 5.60952 20.5 5.78772 20.5 6.0003C20.5 6.2129 20.4281 6.39099 20.2843 6.53458C20.1406 6.67816 19.9625 6.74995 19.75 6.74995H10.0577Z"
				fill={color}
			/>
		</svg>
	);
}
