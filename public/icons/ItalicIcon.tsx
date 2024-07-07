export default function ItalicIcon({ width, height, color = "#8F95B2" }: { width: number; height: number; color?: string }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill={color}>
			<path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" />
		</svg>
	);
}
