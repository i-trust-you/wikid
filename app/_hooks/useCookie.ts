import Codec from "@/_utilities/codec";
import Cookie from "@/_utilities/cookie";
import { useEffect } from "react";

import useCrossState from "@/_hooks/useCrossState";

//
// overloads
//
export default function useCookie<T>(key: string): [T | null, (value: T | ((_: T) => T)) => void];
export default function useCookie<T>(key: string, fallback: T): [T, (value: T | ((_: T) => T)) => void];
//
// implementation
//
export default function useCookie<T>(key: string, fallback?: T) {
	const [value, setter] = useCrossState(key, Codec.decode(Cookie.get(key)) ?? fallback);

	useEffect(() => Cookie.set(key, Codec.encode(value)), [key, value]);

	return [value, setter] as [T, typeof setter];
}
