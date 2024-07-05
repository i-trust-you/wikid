import API from "@/_api";
import { CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";



import Parser from "@/_components/common/Markdown/parser";
import Scanner, { Token } from "@/_components/common/Markdown/scanner";
import Switch from "@/_components/general/Switch";



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
	const [data, setData] = useState("");

	const helper = useRef<HTMLDivElement>(null);
	const editor = useRef<HTMLDivElement>(null);
	const outline = useRef<HTMLDivElement>(null);

	const [size, setSize] = useState<DOMRect>();

	useLayoutEffect(() => {
		if (helper.current) {
			setSize(helper.current.getBoundingClientRect());
		}
	}, []);

	const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0, pointerEvents: "none" });

	const onSelectionChange = useCallback(
		(event: Event) => {
			setTimeout(() => {
				if (size && editor.current && document.activeElement === editor.current) {
					// cache
					const html = editor.current;

					const area = window.getSelection();

					if (area && 0 < area.rangeCount) {
						const [buffer, r1, r2] = [{} as typeof style, area.getRangeAt(0).getBoundingClientRect(), html.getBoundingClientRect()];

						buffer.top = r1.top - r2.top - size.height - 5;
						buffer.left = r1.left - r2.left + r1.width / 2;

						if (!area.isCollapsed && 0 < area.getRangeAt(0).toString().length) {
							// show
							buffer.visibility = "visible";
							buffer.transform = "translate(-50%) scale(1)";
						} else {
							// hide
							buffer.visibility = "hidden";
							buffer.transform = "translate(-50%) scale(0)";
						}
						// reflect
						setStyle(buffer);
					}
				} else {
					// reset
					setStyle({ opacity: 0, pointerEvents: "none" });
				}
			});
		},
		[size],
	);

	useEffect(() => {
		document.addEventListener("selectionchange", onSelectionChange);
		return () => document.removeEventListener("selectionchange", onSelectionChange);
	}, [onSelectionChange]);

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
				html.innerHTML = (0 < data.length ? [data.replace(/\n/g, "<br>"), ...buffer] : buffer).join("<br>");

				let done = 0;

				for (let i = 0; i < files.length; i++) {
					API["{teamId}/images/upload"].POST({}, files[i]).then((response) => {
						// alter
						buffer[i] = `![${files[i].name}](${response.url})`;
						// render
						html.innerHTML = (0 < data.length ? [data.replace(/\n/g, "<br>"), ...buffer] : buffer).join("<br>");
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
			outline.current?.style.setProperty("border-color", null);
		},
		[data],
	);

	const onDragEnter = useCallback((event: React.DragEvent) => {
		// important
		event.preventDefault();
		event.stopPropagation();

		outline.current?.style.setProperty("border-color", "#8F95B2");
	}, []);

	const onDragLeave = useCallback((event: React.DragEvent) => {
		// important
		event.preventDefault();
		event.stopPropagation();

		outline.current?.style.setProperty("border-color", null);
	}, []);

	return (
		<div className="relative flex h-max w-full rounded-[10px] border bg-white drop-shadow-sm">
			<Switch case="editor">
				<div className="flex h-full w-full flex-col">
					<div className="overflow-hidden rounded-t-[10px] border-b border-gray-300 bg-gray-200">
						<Switch.Case of="editor">
							<div className="m-[-1px] flex items-center">
								<button className="rounded-t-[10px] border border-gray-300 border-b-white bg-white px-[16px] py-[8px]">Write</button>
								<Switch.Jump to="viewer">
									<button className="border border-transparent px-[16px] py-[8px]">Preview</button>
								</Switch.Jump>
							</div>
						</Switch.Case>
						<Switch.Case of="viewer">
							<div className="m-[-1px] flex items-center">
								<Switch.Jump to="editor">
									<button className="border border-transparent px-[16px] py-[8px]">Write</button>
								</Switch.Jump>
								<button className="rounded-t-[10px] border border-gray-300 border-b-white bg-white px-[16px] py-[8px]">Preview</button>
							</div>
						</Switch.Case>
					</div>
					<div className="mx-[10px] my-[10px] grow">
						<Switch.Case of="editor">
							<div className="relative flex">
								<div
									ref={helper}
									className="absolute flex h-[35px] items-center justify-center overflow-hidden rounded-[7.5px] border bg-white px-[3px] drop-shadow-sm [&>button:hover]:bg-gray-200 [&>button]:flex [&>button]:aspect-square [&>button]:items-center [&>button]:rounded-[5px] [&>button]:px-[1.5px] [&>button]:py-[1.5px]"
									style={style}
								>
									<button>
										<BoldIcon width="25" height="25" />
									</button>
									<button>
										<ItalicIcon width="25" height="25" />
									</button>
									<button>
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
									<button>
										<BulletIcon width="25" height="25" />
									</button>
									<button>
										<NumberingIcon width="25" height="25" />
									</button>
								</div>
								<div
									ref={editor}
									contentEditable={!readonly}
									data-placeholder="내용을 입력해주세요"
									className="inline-block h-full min-h-[100px] w-full grow resize-y overflow-auto break-all rounded-[10px] border border-gray-300 bg-white px-[10px] py-[10px] text-lg text-gray-500 before:text-gray-300 [&:not(:focus):empty]:before:content-[attr(data-placeholder)]"
									//
									// feat: drop & drop
									//
									onDrop={onDrop}
									onDragEnd={onDrop}
									onDragEnter={onDragEnter}
									onDragLeave={onDragLeave}
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
								<div ref={outline} className="pointer-events-none absolute inset-[5px] rounded-[10px] border-[2.5px] border-dashed border-transparent" />
							</div>
						</Switch.Case>
						<Switch.Case of="viewer">
							<div
								className="h-full min-h-[100px] w-full rounded-[10px] border border-gray-300 px-[10px] py-[10px] text-lg font-normal text-gray-500"
								dangerouslySetInnerHTML={{ __html: Parser.run(Scanner.run(data)).parse() }}
							/>
						</Switch.Case>
					</div>
				</div>
			</Switch>
		</div>
	);
}
