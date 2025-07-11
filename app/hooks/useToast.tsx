import { useState, useCallback } from 'react';

export function useToast() {
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	const showToast = useCallback((message: string) => {
		setToastMessage(message);
	}, []);

	const closeToast = useCallback(() => {
		setToastMessage(null);
	}, []);

	return {
		toastMessage,
		showToast,
		closeToast,
	};
}
