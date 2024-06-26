import Container from "./Container";
import Label from "./Label";
import Option from "./Option";
import { OptionType, useDropdownContext } from "./index";

export type DropdownWithoutChildrenProps = {
	defaultContent?: string;
	options: OptionType[];
	onSelect: ({ value, content }: OptionType) => void;
	optionAlign?: "center" | "left";
};

export default function DropdownWithoutChildren({ defaultContent: defaultContentProp, options, onSelect, optionAlign }: DropdownWithoutChildrenProps) {
	const { selectedOption } = useDropdownContext();

	const defaultContent = defaultContentProp ?? options[0].content;
	const labelContent = selectedOption.content === "" ? defaultContent : selectedOption.content;

	return (
		<Container>
			<Label>{labelContent}</Label>
			{options.map(({ value, content }) => (
				<Option key={value} value={value} onSelect={onSelect} align={optionAlign}>
					{content}
				</Option>
			))}
		</Container>
	);
}
