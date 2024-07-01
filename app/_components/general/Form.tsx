import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

import Dropdown from "@/_components/general/Dropdown";

const NO = crypto.randomUUID();
const OK = "ok";

interface Context {
	values: Readonly<Record<string, FormDataEntryValue>>;
	setValue: (id: string, value: FormDataEntryValue) => void;
	errors: Readonly<Record<string, string>>;
	setError: (id: string, value: string) => void;
	disabled: boolean;
}

// @ts-ignore
const CTX = createContext<Context>();

export default function Form(props: Readonly<React.PropsWithChildren & { onSubmit: (data: FormData) => void }>) {
	const [disabled, setDisabled] = useState(true);

	const [values, setValues] = useState<Record<string, FormDataEntryValue>>({});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const value = useCallback((id: string, value: FormDataEntryValue) => {
		setValues((_) => ({ ..._, [id]: value }));
	}, []);

	const error = useCallback((id: string, value: string) => {
		setErrors((_) => ({ ..._, [id]: value }));
	}, []);

	const self = useRef<HTMLFormElement>(null);

	const timeout = useRef<NodeJS.Timeout | undefined>(undefined);

	useEffect(() => {
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => setDisabled(Object.values(errors).some((entry) => entry !== OK)), 16);
	}, [errors]);

	return (
		<CTX.Provider
			value={{
				values,
				setValue: value,
				errors,
				setError: error,
				disabled,
			}}
		>
			<form
				ref={self}
				onSubmit={(event) => {
					event.preventDefault();
					const data = new FormData();

					for (const [key, value] of Object.entries(values)) {
						data.set(key, value);
					}
					props.onSubmit(data);
				}}
			>
				{props.children}
			</form>
		</CTX.Provider>
	);
}

function useCTX() {
	const ctx = useContext(CTX);

	if (!ctx) throw new Error();

	return ctx;
}

Form.Label = function Label(props: Readonly<React.PropsWithChildren & { for: string }>) {
	const ctx = useCTX();

	return (
		<label htmlFor={props.for} className="text-md font-normal text-gray-500">
			{props.children}
		</label>
	);
};

Form.Error = function Error(props: Readonly<{ for: string }>) {
	const ctx = useCTX();

	switch (ctx.errors[props.for]) {
		case undefined:
		case NO:
		case OK: {
			return null;
		}
		default: {
			return (
				<div id={props.for} className="text-md font-normal text-red-200">
					{ctx.errors[props.for]}
				</div>
			);
		}
	}
};

Form.Input = { Text, Image: ImageInput, Select };

interface Report<T> {
	value: T;
	message: string;
}

function Text(props: Readonly<{ id: string; sync?: Report<string>; pattern?: Report<RegExp>; required?: Report<boolean> }>) {
	const ctx = useCTX();

	const [blur, setBlur] = useState(false);
	const [value, setValue] = useState("");
	const [error, setError] = useState(NO);
	const [sync, setSync] = useState("");

	useLayoutEffect(() => {
		if (props.required?.value) {
			ctx.setError(props.id, NO);
		}
	}, []);

	useEffect(() => {
		ctx.setValue(props.id, value);

		if (props.sync?.value && sync !== value) {
			return setError(props.sync.message);
		}
		if (props.required?.value && value.length === 0) {
			return setError(blur ? props.required.message : NO);
		}
		if (props.pattern?.value && !props.pattern.value.test(value)) {
			return setError(props.pattern.message);
		}
		setError(OK);
	}, [props, blur, error, sync, value]);

	useEffect(() => {
		if (props.sync?.value) setSync(ctx.values[props.sync.value] as string);
	}, [ctx.values]);

	useEffect(() => {
		ctx.setError(props.id, error);
	}, [error]);

	return (
		<input
			id={props.id}
			onBlur={() => setBlur(true)}
			placeholder={props.required?.message}
			onChange={(event) => setValue(event.target.value)}
			className="rounded-[10px] border border-transparent bg-gray-100 px-[20px] py-[14px] text-md font-normal text-gray-500 outline-none placeholder:text-gray-400"
		/>
	);
}

function ImageInput(props: Readonly<{ id: string; required?: Report<boolean> }>) {
	const ctx = useCTX();

	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<FileReader["result"]>();

	const upload = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files!![0];

			setFile(file);

			const reader = new FileReader();

			reader.addEventListener("load", (event) => {
				setPreview(reader.result);
			});

			ctx.setValue(props.id, file);

			ctx.setError(props.id, OK);

			reader.readAsDataURL(file);
		},
		[ctx, props.id],
	);

	useLayoutEffect(() => {
		if (props.required?.value) {
			ctx.setError(props.id, NO);
		}
	}, []);

	return (
		<div>
			<label htmlFor={props.id}>
				<div
					className="flex aspect-square w-full items-center justify-center rounded-full bg-gray-200 bg-cover bg-center text-white"
					style={{ backgroundImage: `url("${preview}")` }}
				>
					<Image src="/icons/camera.svg" alt="icon" width={35} height={35} />
				</div>
				<input id={props.id} type="file" accept=".png,.jpg,.jpeg,.webp" multiple={false} className="hidden" onChange={(event) => upload(event)} />
			</label>
		</div>
	);
}

function Select(props: Readonly<{ id: string; sync?: Report<string>; required?: Report<boolean>; children: string[] }>) {
	const ctx = useCTX();

	const [blur, setBlur] = useState(false);
	const [value, setValue] = useState("");
	const [error, setError] = useState(NO);
	const [sync, setSync] = useState("");

	useLayoutEffect(() => {
		if (props.required?.value) {
			ctx.setError(props.id, NO);
		}
	}, []);

	useEffect(() => {
		ctx.setValue(props.id, value);

		if (props.sync?.value && sync !== value) {
			return setError(props.sync.message);
		}
		if (props.required?.value && value.length === 0) {
			return setError(props.required.message);
		}
		setError(OK);
	}, [props, blur, error, sync, value]);

	useEffect(() => {
		if (props.sync?.value) setSync(ctx.values[props.sync.value] as string);
	}, [ctx.values]);

	useEffect(() => {
		ctx.setError(props.id, error);
	}, [error]);

	return (
		<Dropdown options={props.children.map((value) => ({ value: value, content: value }))} onSelect={(value, content) => setValue(value)}>
			<div className="relative">
				<Dropdown.Trigger>
					<div className="w-full rounded-[10px] border border-transparent bg-gray-100 px-[20px] py-[14px] text-md font-normal text-gray-500 outline-none placeholder:text-gray-400">
						{0 < value.length ? <Dropdown.Current /> : props.required?.message ?? "..."}
					</div>
				</Dropdown.Trigger>
				<div className="absolute z-20 mt-[5px] w-full overflow-hidden rounded-[10px]">
					<Dropdown.Generator>
						{(content) => (
							<div className="border border-transparent bg-gray-100 px-[20px] py-[14px] text-md font-normal text-gray-500 outline-none placeholder:text-gray-400 hover:bg-gray-200">
								{content}
							</div>
						)}
					</Dropdown.Generator>
				</div>
			</div>
		</Dropdown>
	);
}

Form.Submit = function Submit(props: Readonly<React.PropsWithChildren>) {
	const ctx = useCTX();

	return (
		<button
			type="submit"
			disabled={ctx.disabled}
			className="rounded-[10px] bg-primary-200 px-[20px] py-[8px] text-center text-md font-semibold text-white disabled:bg-gray-500"
		>
			{props.children}
		</button>
	);
};
