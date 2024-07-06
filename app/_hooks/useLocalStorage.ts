import Codec from "@/_utilities/codec";
import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, fallback: T) {
	const [storage, set_storage] = useState<T>(() => {
		try {
			return key in localStorage ? Codec.decode(localStorage[key]) : fallback;
		} catch (error) {
			return fallback;
		}
	});

	useEffect(() => {
		function handle(event: StorageEvent) {
			if (key === event.key && event.oldValue !== event.newValue && event.storageArea === localStorage) {
				set_storage(key in localStorage ? Codec.decode(localStorage[key]) : fallback);
			}
		}

		window.addEventListener("storage", handle);
		// @ts-ignore
		window.addEventListener("local-storage", handle);

		return () => {
			window.removeEventListener("storage", handle);
			// @ts-ignore
			window.removeEventListener("local-storage", handle);
		};
	}, [key, fallback]);

	function setter(value: T | ((_: T) => T)) {
		const signal = value instanceof Function ? value(storage) : value;

		localStorage[key] = Codec.encode(signal);

		window.dispatchEvent(
			new StorageEvent("local-storage", { key, storageArea: localStorage, oldValue: Codec.encode(storage), newValue: Codec.encode(signal) }),
		);
	}

	return [storage, setter] as [T, typeof setter];
}
