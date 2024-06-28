import { Ref, createContext } from "react";

interface FormContextProps {
	formData: Record<string, string>;
	setFormData: (formData: Record<string, string>) => void;
	validationFunctions: Record<string, (formData: Record<string, string>) => Record<string, string>>;
}

export default createContext<FormContextProps>({} as FormContextProps);
