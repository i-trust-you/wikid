import API from "@/_api";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import Parser from "@/_components/common/Markdown/parser";
import Scanner, { Token } from "@/_components/common/Markdown/scanner";
import Switch from "@/_components/general/Switch";

import AddPhotoIcon from "../../../../public/icons/AddPhotoIcon";
import BoldIcon from "../../../../public/icons/BoldIcon";
import ItalicIcon from "../../../../public/icons/ItalicIcon";
import OrderedIcon from "../../../../public/icons/OrderedIcon";
import StrikeIcon from "../../../../public/icons/StrikeIcon";
import UnderlineIcon from "../../../../public/icons/UnderlineIcon";
import UnorderedIcon from "../../../../public/icons/UnorderedIcon";

const [FILE_NAME, FILE_SIZE] = [/^[a-zA-Z0-9._\-\s]+\.(?:png|gif|webp|jpe?g)$/, 1024 /* 1KB = 1024byte */ * 1024 /* 1MB = 1024KB */ * 5];

export default function Markdown(props: Readonly<{ data?: string; placeholder?: string; onChange?: (_: string) => void }>) {
	const [data, setData] = useState(props.data ?? "");

	const helper = useRef<HTMLDivElement>(null);
	const editor = useRef<HTMLDivElement>(null);
	const outline = useRef<HTMLDivElement>(null);

	const [size, setSize] = useState<DOMRect>();

	useLayoutEffect(() => {
		if (helper.current) {
			setSize(helper.current.getBoundingClientRect());
		}
	}, []);

	useEffect(() => setData(props.data ?? ""), [props.data]); // two-way binding
	useEffect(() => props.onChange?.(data), [data, props.onChange]); // two-way binding

	const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0, pointerEvents: "none" });

	const onSelectionChange = useCallback(
		(event: Event) => {
			setTimeout(() => {
				if (size && editor.current && document.activeElement === editor.current) {
					// cache
					const [html, region] = [editor.current, window.getSelection()];

					if (region && 0 < region.rangeCount) {
						const [buffer, r1, r2] = [{} as typeof style, region.getRangeAt(0).getBoundingClientRect(), html.getBoundingClientRect()];

						buffer.top = r1.top - r2.top - size.height - 5;
						buffer.left = r1.left - r2.left + r1.width / 2;

						if (!region.isCollapsed && 0 < region.getRangeAt(0).toString().length) {
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
							const file = item.getAsFile();
							// wtf why cant it be null???
							if (file) {
								if (FILE_SIZE < file.size) {
									break scan;
								}
								if (!FILE_NAME.test(file.name)) {
									break scan;
								}
								files.push(file);
							}
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

	const unescape = useCallback((html: HTMLElement) => {
		let buffer = html.innerHTML;

		for (const [entity, character] of Object.entries({
			"<br>": "\n",
			"&nbsp;": " ",
			"&lt;": "<",
			"&gt;": ">",
			"&amp;": "&",
			"&#035;": "#",
			"&quot;": '"',
			"&#039;": "'",
			"&apos;": "'",
		})) {
			buffer = buffer.replace(new RegExp(entity, "g"), character);
		}
		return buffer;
	}, []);

	const stack = useCallback(
		(token: Token, html: HTMLElement, start: number, end: number) => {
			// TODO: WIP
		},
		[data],
	);
	const inline = useCallback(
		(token: Token, html: HTMLElement, start: number, end: number) => {
			let insert = false;

			test: for (let i = 0; i < token.grammar.length; i++) {
				if (token.grammar[i] !== data[start - i - 1]) {
					insert = true;
					break test;
				}
				if (token.grammar[i] !== data[end + i]) {
					insert = true;
					break test;
				}
			}
			const [range, region] = [document.createRange(), window.getSelection()!!];

			if (insert) {
				html.innerHTML = (data.slice(0, start) + token.grammar + data.slice(start, end) + token.grammar + data.slice(end)).replace(/\n/g, "<br>");
				range.setStart(html.firstChild!!, start + token.grammar.length);
				range.setEnd(html.firstChild!!, end + token.grammar.length);
			} else {
				html.innerHTML = (data.slice(0, start - token.grammar.length) + data.slice(start, end) + data.slice(end + token.grammar.length)).replace(/\n/g, "<br>");
				range.setStart(html.firstChild!!, start - token.grammar.length);
				range.setEnd(html.firstChild!!, end - token.grammar.length);
			}
			region.removeAllRanges();
			region.addRange(range);
		},
		[data],
	);

	const decorate = useCallback(
		(token: Token) => {
			if (editor.current) {
				// cache
				const [html, region] = [editor.current, window.getSelection()];

				if (region) {
					const { startOffset: start, endOffset: end } = region.getRangeAt(0);

					switch (token) {
						case Token.OL:
						case Token.UL:
							stack(token, html, start, end);
							break;
						case Token.BOLD:
						case Token.ITALIC:
						case Token.UNDERLINE:
						case Token.STRIKETHROUGH:
							inline(token, html, start, end);
							break;
					}
					// prettier-ignore
					html.focus();
					setData(unescape(html));
				}
			}
		},
		[stack, inline],
	);

	const render = useMemo(() => data && Parser.run(Scanner.run(data)).render(), [data]);

	return (
		<div className="relative flex h-full min-h-max w-full rounded-[10px] border border-gray-300 bg-white drop-shadow-sm">
			<Switch case="editor">
				<div className="flex h-full w-full flex-col">
					<div className="overflow-hidden rounded-t-[10px] bg-gray-200">
						<Switch.Case of="editor">
							<div className="m-[-1px] flex items-center">
								<button type="button" className="rounded-t-[10px] border border-gray-300 border-b-white bg-white px-[16px] py-[8px]">
									Write
								</button>
								<Switch.Jump to="viewer">
									<button type="button" className="border border-transparent px-[16px] py-[8px]">
										Preview
									</button>
								</Switch.Jump>
							</div>
						</Switch.Case>
						<Switch.Case of="viewer">
							<div className="m-[-1px] flex items-center">
								<Switch.Jump to="editor">
									<button type="button" className="border border-transparent px-[16px] py-[8px]">
										Write
									</button>
								</Switch.Jump>
								<button type="button" className="rounded-t-[10px] border border-gray-300 border-b-white bg-white px-[16px] py-[8px]">
									Preview
								</button>
							</div>
						</Switch.Case>
					</div>
					<div className="px-[10px] py-[10px]">
						<Switch.Case of="editor">
							<div className="relative flex">
								<div
									ref={helper}
									className="absolute flex h-[35px] items-center justify-center overflow-hidden rounded-[7.5px] border border-gray-300 bg-white px-[3px] drop-shadow-lg [&>button:hover]:bg-gray-200 [&>button]:flex [&>button]:aspect-square [&>button]:items-center [&>button]:rounded-[5px] [&>button]:px-[1.5px] [&>button]:py-[1.5px]"
									style={style}
								>
									<button type="button" onClick={() => decorate(Token.BOLD)}>
										<BoldIcon width={20} height={20} />
									</button>
									<button type="button" onClick={() => decorate(Token.ITALIC)}>
										<ItalicIcon width={20} height={20} />
									</button>
									<button type="button" onClick={() => decorate(Token.UNDERLINE)}>
										<UnderlineIcon width={20} height={20} />
									</button>
									<button type="button" onClick={() => decorate(Token.STRIKETHROUGH)}>
										<StrikeIcon width={20} height={20} />
									</button>
									<button type="button">
										<OrderedIcon width={25} height={25} />
									</button>
									<button type="button">
										<UnorderedIcon width={25} height={25} />
									</button>
									<button type="button">
										<AddPhotoIcon width={25} height={25} />
									</button>
								</div>
								<div
									ref={editor}
									contentEditable={!readonly}
									data-placeholder={props.placeholder}
									className="inline-block h-full min-h-[130px] w-full grow resize-y overflow-auto whitespace-pre break-all rounded-[10px] border border-gray-300 bg-white px-[10px] py-[10px] text-lg text-gray-500 before:text-gray-300 [&:not(:focus):empty]:before:content-[attr(data-placeholder)]"
									//
									// feat: drop & drop
									//
									onDrop={onDrop}
									onDragEnd={onDrop}
									onDragOver={onDragEnter}
									onDragEnter={onDragEnter}
									onDragLeave={onDragLeave}
									//
									// feat: prevent html
									//
									onPaste={(event) => {
										// fuck off
										event.preventDefault();
										// get raw data
										const raw = event.clipboardData.getData("Text");
										// inset raw data
										document.execCommand("insertHTML", false, raw.replace(/\r?\n/g, "<br>"));
									}}
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
										const text = unescape(event.target);

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
								className="h-full min-h-[130px] w-full rounded-[10px] border border-transparent px-[10px] py-[10px] text-lg font-normal text-gray-500"
								dangerouslySetInnerHTML={{ __html: render }}
							/>
						</Switch.Case>
					</div>
				</div>
			</Switch>
		</div>
	);
}
