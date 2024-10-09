import { useRef, useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useFormField } from '@/react-utils';
import ValidationList from './ValidationList';

import type {ChangeEvent} from 'react';
import type {FormInputProps} from './shared';

export default function CheckboxInput(props: FormInputProps<boolean>) {
	const {
		id,
		name,
		displayName,
		hideNonErrors,
		validators = [],
		children
	} = props;

	const currentValue = useRef(false);
	const [validations, interact] = useFormField(id, displayName, currentValue, validators);
	const [rerender, setRerender] = useState(0);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.checked;
		if (currentValue.current !== newValue) {
			currentValue.current = e.target.checked;
			interact();
			setRerender(rerender + 1);
		}
	}

	return (
		<>
			<FormControlLabel
				htmlFor={id}
				control={
					<Checkbox
						id={id}
						name={name ?? id}
						checked={currentValue.current}
						onChange={handleChange}
					/>
				}
				label={children ?? displayName}
			/>

			<ValidationList
				validations={validations}
				hideNonErrors={hideNonErrors}
			/>
		</>
	);
}