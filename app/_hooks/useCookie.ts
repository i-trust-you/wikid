import Codec from "@/_utilities/codec";
import Cookie from "@/_utilities/cookie";
import { useEffect } from "react";

import useCrossState from "@/_hooks/useCrossState";

//
// overloads
//
export default function useCookie<T>(key: string): [T | null, (value: T | null | ((_: T | null) => T | null)) => void];
export default function useCookie<T>(key: string, fallback?: T | (() => T)): [T, (value: T | ((_: T) => T)) => void];
//
// implementation
//
export default function useCookie<T>(key: string, fallback?: T | (() => T)) {
	const [value, setter] = useCrossState(key, () => {
		try {
			return Codec.decode(Cookie.get(key)) ?? (fallback instanceof Function ? fallback() : fallback);
		} catch (error) {
			return fallback instanceof Function ? fallback() : fallback;
		}
	});

	useEffect(() => Cookie.set(key, Codec.encode(value)), [key, value]);

	return [value, setter] as [T, typeof setter];
}
