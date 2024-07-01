"use client";

import useCrossState from "@/_hooks/useCrossState";
import useLocalStorage from "@/_hooks/useLocalStorage";

export default function Page() {
	// test uselocalstorage (localstorage)
	const [a, setA] = useLocalStorage("test", 0);
	const [b, setB] = useLocalStorage("test", 0);
	const [c, setC] = useLocalStorage("test", 0);
	// test usecrossstate (memory)
	const [d, setD] = useCrossState("idk", 0);
	const [e, setE] = useCrossState("idk", 0);
	const [f, setF] = useCrossState("idk", 0);

	return (
		<main className="flex flex-col items-center">
			<button onClick={() => setA((_) => _ + 1)}>ㅇㅇ</button>
			<button onClick={() => setB((_) => _ + 1)}>ㅇㅇ</button>
			<button onClick={() => setC((_) => _ + 1)}>ㅇㅇ</button>
			<hr />
			<div>{a}</div>
			<div>{b}</div>
			<div>{c}</div>
			<hr />
			<button onClick={() => setD((_) => _ + 1)}>ㅇㅇ</button>
			<button onClick={() => setE((_) => _ + 1)}>ㅇㅇ</button>
			<button onClick={() => setF((_) => _ + 1)}>ㅇㅇ</button>
			<hr />
			<div>{d}</div>
			<div>{e}</div>
			<div>{f}</div>
		</main>
	);
}
