import Container from "./Container";

export default function DropdownWithChildren({ children }: React.PropsWithChildren) {
	return <Container>{children}</Container>;
}
