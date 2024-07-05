import API from "@/_api";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";

import AlignCenterIcon from "../../../../public/icons/AlignCenterIcon";
import AlignLeftIcon from "../../../../public/icons/AlignLeftIcon";
import AlignRightIcon from "../../../../public/icons/AlignRightIcon";
import BoldIcon from "../../../../public/icons/BoldIcon";
import BulletIcon from "../../../../public/icons/BulletIcon";
import ColoringIcon from "../../../../public/icons/ColoringIcon";
import ItalicIcon from "../../../../public/icons/ItalicIcon";
import NumberingIcon from "../../../../public/icons/NumberingIcon";
import UnderlineIcon from "../../../../public/icons/UnderlineIcon";

const [FILE_NAME, FILE_SIZE] = [/^[a-zA-Z0-9._\-\s]+\.(?:png|webp|jpe?g)$/, 1024 /* 1KB = 1024byte */ * 1024 /* 1MB = 1024KB */ * 5];

export default function Markdown() {
	const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	const [data, setData] = useState("");

	const helper = useRef<HTMLDivElement>(null);
	const editor = useRef<HTMLDivElement>(null);

	const onSelectionChanged = () => {
		setTimeout(() => {
			const editorRef = editor.current;
			if (!editorRef) return;

			const selection = window.getSelection();
			if (!selection || selection.rangeCount === 0) return;

			const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
			const editorRect = editorRef.getBoundingClientRect();

			// The toolbar shouldn't be positioned directly on top of the selected text,
			// but rather with a small offset so the caret doesn't overlap with the text.
			const extraTopOffset = -5;

			const newPosition = {
				top: selectionRect.top - editorRect.top - (helper.current?.getBoundingClientRect().height ?? 0) + extraTopOffset,
				left: selectionRect.left - editorRect.left + selectionRect.width / 2,
			};

			setPosition(newPosition);
			setIsVisible(!selection.isCollapsed && selection.getRangeAt(0).toString().length > 0);
		});
	};

	const getStyle = (): CSSProperties => {
		if (!position) return { visibility: "hidden", transform: "translate(-50%) scale(0)" };

		const style: CSSProperties = { ...position };

		if (isVisible) {
			style.visibility = "visible";
			style.transform = "translate(-50%) scale(1)";
			style.transition = "transform 0.15s cubic-bezier(.3,1.2,.2,1)";
		} else {
			style.transform = "translate(-50%) scale(0)";
			style.visibility = "hidden";
		}

		return style;
	};

	useEffect(() => {
		document.addEventListener("selectionchange", onSelectionChanged);
		return () => {
			document.removeEventListener("selectionchange", onSelectionChanged);
		};
	}, []);

	const [readonly, setReadOnly] = useState(false);

	const onDrop = useCallback(
		(event: React.DragEvent) => {
			// important
			event.preventDefault();
			event.stopPropagation();

			if (editor.current) {
				// cache
				const html = editor.current;
				// seal
				setReadOnly(true);

				const files = [] as File[];

				loop: for (const item of event.dataTransfer.items) {
					scan: switch (item.kind) {
						case "file": {
							const file = item.getAsFile() as File;

							if (FILE_SIZE < file.size) {
								break scan;
							}
							if (!FILE_NAME.test(file.name)) {
								break scan;
							}
							files.push(file);
							break scan;
						}
					}
				}
				const buffer = files.map((_) => `![Uploading ${_.name}...]()`);
				// render
				html.innerHTML = [data.replace(/\n/g, "<br>"), ...buffer].join("<br>");

				let done = 0;

				for (let i = 0; i < files.length; i++) {
					API["{teamId}/images/upload"].POST({}, files[i]).then((response) => {
						// alter
						buffer[i] = `![${files[i].name}](${response.url})`;
						// render
						html.innerHTML = [data.replace(/\n/g, "<br>"), ...buffer].join("<br>");
						// resolve
						if (++done === files.length) {
							// unseal
							setReadOnly(false);
							// reflect
							setData([data, ...buffer].join("\n"));
						}
					});
				}
			}
		},
		[data],
	);

	const onDragEnter = useCallback((event: React.DragEvent) => {
		// important
		event.preventDefault();
		event.stopPropagation();

		editor.current?.style.setProperty("border-color", "#8F95B2");
	}, []);

	const onDragLeave = useCallback((event: React.DragEvent) => {
		// important
		event.preventDefault();
		event.stopPropagation();

		editor.current?.style.setProperty("border-color", "transparent");
	}, []);

	return (
		<div className="relative flex h-max w-full rounded-[10px] border bg-white drop-shadow-sm">
			<div
				ref={helper}
				className="absolute flex h-[35px] items-center justify-center overflow-hidden rounded-[7.5px] border bg-white px-[3px] drop-shadow-sm [&>button:hover]:bg-gray-200 [&>button]:flex [&>button]:aspect-square [&>button]:items-center [&>button]:rounded-[5px] [&>button]:px-[1.5px] [&>button]:py-[1.5px]"
				style={getStyle()}
			>
				<button onClick={() => style("bold")}>
					<BoldIcon width="25" height="25" />
				</button>
				<button onClick={() => style("italic")}>
					<ItalicIcon width="25" height="25" />
				</button>
				<button onClick={() => style("underline")}>
					<UnderlineIcon width="25" height="25" />
				</button>
				<button>
					<ColoringIcon width="25" height="25" />
				</button>
				<button>
					<AlignLeftIcon width="25" height="25" />
				</button>
				<button>
					<AlignCenterIcon width="25" height="25" />
				</button>
				<button>
					<AlignRightIcon width="25" height="25" />
				</button>
				<button onClick={() => style("ul")}>
					<BulletIcon width="25" height="25" />
				</button>
				<button onClick={() => style("ol")}>
					<NumberingIcon width="25" height="25" />
				</button>
			</div>
			<div
				ref={editor}
				contentEditable={!readonly}
				data-placeholder="내용을 입력해주세요"
				className="mx-[5px] my-[5px] inline-block grow resize-y overflow-auto break-all rounded-[10px] border-[2.5px] border-dashed border-transparent bg-white px-[10px] py-[5px] outline-none before:text-gray-300 [&:not(:focus):empty]:before:content-[attr(data-placeholder)]"
				//
				// feat: drop & drop
				//
				onDrop={onDrop}
				onDragEnd={onDrop}
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				//
				// feat: toolbar
				//
				onSelect={onSelectionChanged}
				//
				// feat: prevent html
				//
				onKeyDown={(event) => {
					switch (event.key) {
						case "Enter": {
							// fuck off
							event.preventDefault();
							// insert <br>
							document.execCommand("insertLineBreak");
							break;
						}
					}
				}}
				onInput={(event) => {
					// @ts-ignore
					const text = event.target.innerHTML.replace(/<br>/g, "\n");

					// @ts-ignore
					if (event.target.children.length === 1 && event.target.lastChild.nodeName === "BR") {
						// @ts-ignore
						event.target.lastChild.remove();
					}
					// phew...
					setData(text);
				}}
			/>
		</div>
	);
}
