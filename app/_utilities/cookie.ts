export default class Cookie {
	public static get(key: string) {
		let matches = document.cookie.match(new RegExp("(?:^|; )" + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
		return matches ? matches[1] : undefined;
	}
	public static set(
		key: string,
		value: unknown,
		options: {
			httpOnly?: boolean;
			path?: string;
			domain?: string;
			secure?: boolean;
			expires?: Date;
			["max-age"]?: number;
			samesite?: "Strict" | "None" | "Lax";
		} = {},
	) {
		const buffer = [`${key}=${value};`];

		for (const [key, value] of Object.entries(options)) {
			buffer.push(typeof value === "boolean" ? `${key}` : `${key}=${key === "expire" ? (value as Date).toUTCString() : value}`);
		}
		document.cookie = buffer.join(";\u0020");
	}
	public static delete(key: string) {
		this.set(key, null, { ["max-age"]: -1 });
	}
}
