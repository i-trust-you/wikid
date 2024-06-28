"use client";

import Form from "@/_components/common/Form/Form";
import Input from "@/_components/common/Form/Input";

export default function Page() {
	return (
		<div>
			<Form
				onSubmit={(data) => console.log(data)}
				validationFunction={function (formData: Record<string, string>): Record<string, string> {
					let errorRecord: Record<string, string> = { email: "wrong Email" } as Record<string, string>;
					return errorRecord;
				}}
			>
				<Input name="name" type="text" />
				<Input name="email" label="Email" type="email" />
				<button type="submit">Submit</button>
			</Form>
		</div>
	);
}
