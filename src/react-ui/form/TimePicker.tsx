import { useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { MobileTimePicker as MaterialTimePicker } from '@mui/x-date-pickers';
import ValidationList from './ValidationList.tsx';
import { useFormFieldValidation, useRerender } from '@sienar/react-utils';

import type { Dayjs } from 'dayjs';
import type { FormInputProps } from './shared.ts';

export type TimePickerProps = FormInputProps<Dayjs|null>;

export default function DatePicker(props: TimePickerProps) {
	const {
		name,
		displayName,
		children,
		value,
		onChange,
		validators = []
	} = props;

	const currentValue = useRef<Dayjs>(dayjs(value ?? null));
	const [ rerender ] = useRerender();
	const handleDatePickerChange = (newValue: Dayjs|string|null) => {
		if (currentValue.current?.isSame(newValue)) return;
		if (typeof newValue === 'string' && newValue.startsWith('0')) newValue = null;

		currentValue.current = dayjs(newValue ?? null);
		onChange?.(currentValue.current);
		rerender();
	}

	const [ validations, interact ] = useFormFieldValidation(name, displayName, currentValue.current, handleDatePickerChange, validators);

	const handleChange = async (newValue: Dayjs|null) => {
		if (newValue?.isSame(currentValue.current)) {
			return;
		}

		handleDatePickerChange(newValue);
		interact();
	}

	useEffect(() => {
		handleDatePickerChange(value ?? null);
	}, [value]);

	return (
		<div>
			<MaterialTimePicker
				label={children ?? displayName}
				value={currentValue.current as Dayjs}
				onChange={handleChange}
			/>

			<ValidationList
				validations={validations}
			/>
		</div>
	);
}