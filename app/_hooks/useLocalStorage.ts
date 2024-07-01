import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, fallback: T)
{
	//
	// due to a hydration mismatch
	// the initial value must be updated
	// after the very first render occurs
	//
	const [storage, set_storage] = useState<T>(fallback);

	useEffect(() =>
	{
		//
		// initial update
		//
		set_storage(key in localStorage ? deserialize(localStorage[key]) : fallback);

		function handle(event: StorageEvent)
		{
			if (key === event.key && event.oldValue !== event.newValue && event.storageArea === localStorage)
			{
				set_storage(key in localStorage ? deserialize(localStorage[key]) : fallback);
			}
		}

		window.addEventListener("storage", handle);
		// @ts-ignore
		window.addEventListener("local-storage", handle);

		return () =>
		{
			window.removeEventListener("storage", handle);
			// @ts-ignore
			window.removeEventListener("local-storage", handle);
		};
	},
	[key, fallback]);

	function setter(value: T | ((_: T) => T))
	{
		const signal = value instanceof Function ? value(storage) : value;

		switch (signal)
		{
			case null: case undefined:
			{
				localStorage[key] = serialize(fallback);
				break;
			}
			default:
			{
				localStorage[key] = serialize(signal);
				break;
			}
		}
		window.dispatchEvent(new StorageEvent("local-storage", { key, storageArea: localStorage, oldValue: serialize(storage), newValue: serialize(signal) }));
	}

	return [storage, setter] as [T, typeof setter];
}

function serialize(value: unknown) { return JSON.stringify({ ["value"]: value }); } function deserialize(value: unknown) { return JSON.parse(String(value))["value"]; }
