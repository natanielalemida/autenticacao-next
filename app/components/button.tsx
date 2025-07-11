import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
	return (
		<button
			className="w-full bg-[#002F99] text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
			{...props}
		>
			{children}
		</button>
	);
}
