"use client";

import { ChangeEvent, FC, useContext, useRef, useState } from "react";

import FormContext from "@/_components/common/Form/FormContext";

interface InputProps {
	name: string;
	type: string;
	placeholder?: string;
}

const Input: FC<InputProps> = ({ name, type, placeholder }) => {
	const { formData, setFormData, validationFunctions } = useContext(FormContext);

	const checkValidity = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });

		event.target.setCustomValidity("");
		const errorArray = validationFunctions[name](formData);
		Object.entries(errorArray).forEach(([inputName, errorMessage]) => {
			const wrongInput = event.target.form?.elements.namedItem(inputName) as HTMLInputElement;
			wrongInput.setCustomValidity(errorMessage);
			wrongInput.dispatchEvent(new Event("invalid"));
		});
	};
	return (
		<>
			<input type={type} id={name} value={formData[name] || ""} placeholder={placeholder ? placeholder : ""} onChange={checkValidity} />;
		</>
	);
};

export default Input;
