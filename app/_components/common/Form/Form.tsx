"use client";

import { FC, FormEvent, PropsWithChildren, ReactNode, Ref, useEffect, useRef, useState } from "react";

import FormContext from "@/_components/common/Form/FormContext";

interface FormProps {
	onSubmit: (formData: Record<string, string>) => void;
	validationFunctions: Record<string, (formData: Record<string, string>) => Record<string, string>>;
}

const Form: FC<PropsWithChildren<FormProps>> = ({ children, onSubmit, validationFunctions }) => {
	const [formData, setFormData] = useState({} as Record<string, string>);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(formData);
	};

	return (
		<FormContext.Provider value={{ formData, setFormData, validationFunctions }}>
			<form onSubmit={handleSubmit}>{children}</form>
		</FormContext.Provider>
	);
};

export default Form;
