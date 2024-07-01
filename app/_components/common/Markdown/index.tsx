import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

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

export default function Markdown(props: Readonly<{ children?: string }>) {
	const [data, setData] = useState(props.children ?? "");

	const input = useRef<HTMLTextAreaElement>(null);

	const style = useCallback((type: "bold" | "italic" | "underline" | "ol" | "ul") => {
		if (!input.current) throw new Error();

		const [text, start, end] = [input.current.value, input.current.selectionStart, input.current.selectionEnd];

		function inline(token: Token) {
			let insert = false;
			test: for (let i = 0; i < token.grammar.length; i++) {
				if (token.grammar[i] !== text[start - i - 1]) {
					insert = true;
					break test;
				}
				if (token.grammar[i] !== text[end + i]) {
					insert = true;
					break test;
				}
			}
			if (insert) {
				input.current!!.value = text.slice(0, start) + token.grammar + text.slice(start, end) + token.grammar + text.slice(end);
				input.current!!.setSelectionRange(start + token.grammar.length, end + token.grammar.length);
			} else {
				input.current!!.value = text.slice(0, start - token.grammar.length) + text.slice(start, end) + text.slice(end + token.grammar.length);
				input.current!!.setSelectionRange(start - token.grammar.length, end - token.grammar.length);
			}
		}

		switch (type) {
			case "bold": {
				inline(Token.BOLD);
				break;
			}
			case "italic": {
				inline(Token.ITALIC);
				break;
			}
			case "underline": {
				inline(Token.UNDERLINE);
				break;
			}
		}
		input.current.focus();
		setData(input.current.value);
	}, []);

	const adjust = useCallback(() => {
		if (!input.current) throw new Error();

		input.current.style.setProperty("height", "auto");
		input.current.style.setProperty("height", input.current.scrollHeight + 1.5 + "px");
	}, []);

	useLayoutEffect(() => {
		adjust();
	}, []);

	return (
		<div className="h-max w-full overflow-hidden rounded-[10px] border border-gray-300 bg-white">
			<Switch case="editor">
				<div className="flex h-full w-full flex-col">
					<div className="border-b border-gray-300 bg-gray-200">
						<Switch.Case of="editor">
							<div className="m-[-1px] flex items-center justify-between">
								<div className="flex items-center text-lg font-normal text-gray-500">
									<button className="rounded-t-[10px] border border-gray-300 border-b-white bg-white px-[16px] py-[8px]">Write</button>
									<Switch.Jump to="viewer">
										<button className="border border-transparent px-[16px] py-[8px]">Preview</button>
									</Switch.Jump>
								</div>
								<div className="mx-[10px] flex items-center gap-[3.5px]">
									<button className="flex aspect-square items-center rounded-[3.5px] px-[3.5px] py-[3.5px] hover:bg-gray-300" onClick={() => style("bold")}>
										<BoldIcon width="25" height="25" />
									</button>
									<button className="flex aspect-square items-center rounded-[3.5px] px-[3.5px] py-[3.5px] hover:bg-gray-300" onClick={() => style("italic")}>
										<ItalicIcon width="25" height="25" />
									</button>
									<button
										className="flex aspect-square items-center rounded-[3.5px] px-[3.5px] py-[3.5px] hover:bg-gray-300"
										onClick={() => style("underline")}
									>
										<UnderlineIcon width="25" height="25" />
									</button>
									{/* <button className="flex aspect-square items-center rounded-[3.5px] px-[3.5px] py-[3.5px] hover:bg-gray-300">
										<ColoringIcon width="25" height="25" />
									</button>
									<button className="flex aspect-square items-center rounded-[3.5px] px-[3.5px] py-[3.5px] hover:bg-gray-300">
										<AlignLeftIcon width="25" height="25" />
									</button>
									<button className="flex aspect-square items-center rounded-[3.5px] px-[3.5px] py-[3.5px] hover:bg-gray-300">
										<AlignCenterIcon width="25" height="25" />
									</button>
									<button className="flex aspect-square items-center rounded-[3.5px] px-[3.5px] py-[3.5px] hover:bg-gray-300">
										<AlignRightIcon width="25" height="25" />
									</button> */}
									{/* <button className="flex aspect-square items-center rounded-[3.5px] px-[3.5px] py-[3.5px] hover:bg-gray-300">
										<BulletIcon width="25" height="25" />
									</button>
									<button className="flex aspect-square items-center rounded-[3.5px] px-[3.5px] py-[3.5px] hover:bg-gray-300">
										<NumberingIcon width="25" height="25" />
									</button> */}
								</div>
							</div>
						</Switch.Case>
						<Switch.Case of="viewer">
							<div className="m-[-1px] flex items-center justify-between">
								<div className="flex items-center text-lg font-normal text-gray-500">
									<Switch.Jump to="editor">
										<button className="border border-transparent px-[16px] py-[8px]">Write</button>
									</Switch.Jump>
									<button className="rounded-t-[10px] border border-gray-300 border-b-white bg-white px-[16px] py-[8px]">Preview</button>
								</div>
							</div>
						</Switch.Case>
					</div>
					<div className="mx-[10px] my-[10px] grow">
						<Switch.Case of="editor">
							<textarea
								ref={input}
								rows={1}
								defaultValue={data}
								className="h-full min-h-[100px] w-full rounded-[10px] border border-gray-300 px-[10px] py-[10px] text-lg font-normal text-gray-500"
								onChange={(event) => {
									setData(event.target.value);
									adjust();
								}}
							></textarea>
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
