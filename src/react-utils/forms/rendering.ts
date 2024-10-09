import { useState } from 'react';

export function useRerender() {
	const [counter, setCounter] = useState(0);
	return () => setCounter(counter + 1);
}