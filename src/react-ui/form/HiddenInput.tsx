import { useFormFieldValidation } from '@sienar/react-utils';

export type HiddenInputProps = {
	name: string
	value: string|number|boolean
}

export default function HiddenInput({ name, value }: HiddenInputProps) {
	useFormFieldValidation(name, undefined, value, () => {}, []);

	return (
		<input
			type='hidden'
			name={name}
			value={value.toString()}
			readOnly
		/>
	)
}