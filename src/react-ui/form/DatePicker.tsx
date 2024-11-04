import { useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker as MobileDatePicker } from '@mui/x-date-pickers';
import ValidationList from './ValidationList.tsx';
import { useFormFieldValidation, useRerender } from '@/react-utils';

import type { Dayjs } from 'dayjs';
import type { FormInputProps } from './shared.ts';

export type DatePickerProps = Omit<FormInputProps<Dayjs>, 'onChange'> & {
	onChange?: (newDate: Dayjs|null) => any
}

export default function DatePicker(props: DatePickerProps) {
	const {
		name,
		displayName,
		children,
		onChange,
		validators = []
	} = props;

	const currentValue = useRef<Dayjs|null>(null);
	const fieldRef = useRef<HTMLInputElement>(null);
	const rerender = useRerender();
	const [ validations, interact ] = useFormFieldValidation(name, displayName,
		currentValue, validators);

	const handleDatePickerChange = async (newValue: Dayjs|null) => {
		fieldRef.current!.value = newValue?.toISOString() ?? '';
		fieldRef.current!.dispatchEvent(new Event('input'));
		onChange?.(newValue);
	}

	const handleChange = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		const newValue = target.value ? dayjs(target.value) : null;
		if (newValue?.isSame(currentValue.current)) {
			return;
		}

		currentValue.current = newValue;
		interact();
		rerender();
	}

	useEffect(() => {
		const ref = fieldRef.current!;
		ref.addEventListener('input', handleChange);
		return () => ref.removeEventListener('input', handleChange);
	});

	return (
		<>
			<input
				type='hidden'
				ref={fieldRef}
			/>

			<MobileDatePicker
				label={children ?? displayName}
				value={currentValue.current}
				onChange={handleDatePickerChange}
			/>

			<ValidationList
				validations={validations}
			/>
		</>
	);
}