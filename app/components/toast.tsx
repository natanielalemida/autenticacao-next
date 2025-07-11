import React, { useEffect } from 'react';

type ToastProps = {
	message: string;
	onClose: () => void;
};

export function Toast({ message, onClose }: ToastProps) {
	useEffect(() => {
		const timer = setTimeout(onClose, 4000); // fecha sozinho em 4s
		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fadeIn">
			{message}
		</div>
	);
}
