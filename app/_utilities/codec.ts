export default class Codec {
	// serialize
	public static encode(value: unknown) {
		return JSON.stringify({ ["."]: value });
	}
	// deserialize
	public static decode(value: unknown) {
		return JSON.parse(String(value))["."];
	}
}
