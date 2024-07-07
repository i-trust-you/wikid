import { useCallback, useEffect, useState } from "react";


const ON_GOING = new Set<string>();

const enum RequestType {
	SYNC = "sync",
	ASSIGN = "assign",
}

interface Request<T> {
	readonly type: RequestType;
	readonly path: string;
	readonly data?: T;
	// dont forget me..!
	readonly life?: number;
}

const enum ResponseType {
	EMPTY = "empty",
	LOADING = "loading",
	SUCCESS = "success",
}

interface Response<T> {
	readonly type: ResponseType;
	readonly path: string;
	readonly data: T;
}

/** @see https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem */
const WORKER = new SharedWorker(
	"data:text/javascript;base64," +
		btoa(
			String.fromCodePoint(
				...new TextEncoder().encode(
					"(" +
						// start
						function () {
							const INIT = Symbol();

							const [ports, storage] = [[] as MessagePort[], new Map<string, unknown | typeof INIT>()];

							// @ts-ignore
							self.addEventListener("connect", (event: MessageEvent) => {
								const port = event.ports[0];

								ports.push(port);

								port.addEventListener("message", (event) => {
									const request = event.data as Request<unknown>;

									switch (request.type) {
										case RequestType.SYNC: {
											if (!storage.has(request.path)) {
												// allocate
												storage.set(request.path, INIT);

												port.postMessage({ type: ResponseType.EMPTY, path: request.path, data: null } as Response<unknown>);
											} else {
												// read cache
												const cache = storage.get(request.path);

												if (cache === INIT) {
													port.postMessage({ type: ResponseType.LOADING, path: request.path, data: null } as Response<unknown>);
												} else {
													port.postMessage({ type: ResponseType.SUCCESS, path: request.path, data: cache } as Response<unknown>);
												}
											}
											break;
										}
										case RequestType.ASSIGN: {
											// write cache
											storage.set(request.path, request.data);

											for (const port of ports) {
												port.postMessage({ type: ResponseType.SUCCESS, path: request.path, data: request.data } as Response<unknown>);
											}
											// expire
											if (0 < (request?.life ?? 0)) {
												// delete cache
												setTimeout(() => storage.delete(request.path), request.life);
											}
											break;
										}
									}
								});
								// ..!
								port.start();
							});
						}.toString() +
						// close
						")()",
				),
			),
		),
);
// ..!
WORKER.port.start();

interface Options {
	retry?: number;
	lifespan?: number;
	refresh_on_focus?: boolean;
	refresh_on_interval?: number;
	refresh_on_reconnect?: boolean;
}

export default function useQuery<T>(
	key: string,
	fetcher: () => Promise<T>,
	{ retry = 0, lifespan = NaN, refresh_on_focus = true, refresh_on_interval = NaN, refresh_on_reconnect = true }: Options = {},
) {
	const [data, set_data] = useState<T>();

	/** @see https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker */
	useEffect(() => {
		function handle(event: MessageEvent) {
			const response = event.data as Response<T>;
			//
			// STEP 2. match key & value
			//
			if (response.path === key) {
				switch (response.type) {
					case ResponseType.EMPTY: {
						//
						// STEP 3. dedupe
						//
						if (!ON_GOING.has(key)) {
							//
							// STEP 4. allocate (page wise)
							//
							ON_GOING.add(key);
							//
							// STEP 6. fetch data
							//
							fetcher().then((data) => {
								//
								// STEP 7. assignment (page wise)
								//
								set_data(data);
								//
								// STEP 8. unaullocate (page wise)
								//
								ON_GOING.delete(key);
								//
								// STEP 9. assignment (tabs wise)
								//
								WORKER.port.postMessage({ type: RequestType.ASSIGN, path: key, data: data, life: lifespan } as Request<T>);
							});
						}
						break;
					}
					case ResponseType.SUCCESS: {
						//
						// STEP 3. compare data
						//
						if (response.data !== data) {
							//
							// STEP 4. assignment (page wise)
							//
							set_data(response.data);
						}
						break;
					}
				}
				// console.debug(response);
			}
		}
		WORKER.port.addEventListener("message", handle);
		return () => WORKER.port.removeEventListener("message", handle);
	}, [key, data, fetcher, lifespan]);

	//
	// STEP 1. synchronize
	//
	const sync = useCallback(() => WORKER.port.postMessage({ type: RequestType.SYNC, path: key } as Request<T>), [key]);

	/** @see https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API */
	useEffect(() => {
		function handle(event: Event) {
			if (!document.hidden && refresh_on_focus) sync();
		}
		document.addEventListener("visibilitychange", handle);
		return () => document.removeEventListener("visibilitychange", handle);
	}, [sync, refresh_on_focus]);

	/** @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine */
	useEffect(() => {
		function handle(event: Event) {
			if (refresh_on_reconnect) sync();
		}
		window.addEventListener("online", handle);
		return () => window.removeEventListener("online", handle);
	}, [sync, refresh_on_reconnect]);

	useEffect(() => {
		if (0 < refresh_on_interval) {
			const id = setInterval(sync, refresh_on_interval);

			return () => clearInterval(id);
		}
	}, [sync, refresh_on_interval]);

	useEffect(() => {
		if (navigator.onLine) sync();
	}, []);

	return data;
}
