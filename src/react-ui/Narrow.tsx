import { Container } from '@mui/material';
import type { PropsWithChildren } from 'react';

export default function Narrow({ children }: PropsWithChildren) {
	return (
		<Container maxWidth='sm'>
			{children}
		</Container>
	)
}