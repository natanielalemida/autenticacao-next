import React from 'react';
import { colors } from '../styles/colors';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type: string;
	placeholder: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ ...props }, ref) => {
		return (
			<input
				ref={ref}
				className="w-full border border-[#E5E7EB] rounded-lg p-3 text-sm focus:outline-none"
				style={{ backgroundColor: colors.white }}
				{...props}
			/>
		);
	}
);

Input.displayName = 'Input';
