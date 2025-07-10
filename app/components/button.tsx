import React from 'react';
import { colors } from '../styles/colors';

interface ButtonProps {
	readonly children: React.ReactNode;
}

export function Button({ children }: ButtonProps) {
	return (
		<button
			className="w-full p-3 text-white rounded-lg text-sm font-medium"
			style={{ backgroundColor: colors.primary }}
		>
			{children}
		</button>
	);
}
