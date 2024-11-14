import { useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker as MobileDatePicker } from '@mui/x-date-pickers';
import ValidationList from './ValidationList.tsx';
import { useFormFieldValidation, useRerender } from '@/react-utils';

import type { Dayjs } from 'dayjs';
import type { FormInputProps } from './shared.ts';

export type DatePickerProps = FormInputProps<Dayjs|string|null>;

export default function DatePicker(props: DatePickerProps) {
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
		if (currentValue.current === newValue) return;
		if (typeof newValue === 'string' && newValue.startsWith('0')) newValue = null;

		currentValue.current = dayjs(newValue ?? null);
		onChange?.(currentValue.current);
		rerender();
	}

	const [ validations, interact ] = useFormFieldValidation(name, displayName,
		currentValue.current, handleDatePickerChange, validators);

	const handleChange = async (newValue: Dayjs|null) => {
		if (newValue?.isSame(currentValue.current)) {
			return;
		}

		handleDatePickerChange(newValue);
		interact();
	}

	useEffect(() => {
		currentValue.current = dayjs(value ?? null);
	}, [value]);

	return (
		<>
			<MobileDatePicker
				label={children ?? displayName}
				value={currentValue.current as Dayjs}
				onChange={handleChange}
			/>

			<ValidationList
				validations={validations}
			/>
		</>
	);
}