import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '../schema/loginSchema';
import useLogin from '../hooks/useLogin';
import { motion } from 'framer-motion';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/toast';

export function LoginForm() {
	const { toastMessage, showToast, closeToast } = useToast();
	const { onLogin } = useLogin(showToast);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

	return (
		<>
			{toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
			<motion.form
				onSubmit={handleSubmit(onLogin)}
				className="flex flex-col gap-4"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -20 }}
				transition={{ duration: 0.3 }}
			>
				<div>
					<label className="text-sm text-gray-700">Email</label>
					<Input
						type="email"
						placeholder="e-mail@website.com"
						{...register('email')}
					/>
					{errors.email && (
						<p className="text-red-500 text-sm">{errors.email.message}</p>
					)}
				</div>
				<div>
					<label className="text-sm text-gray-700">Senha</label>
					<Input
						type="password"
						placeholder="min. 8 caracteres"
						{...register('password')}
					/>
					{errors.password && (
						<p className="text-red-500 text-sm">{errors.password.message}</p>
					)}
				</div>
				<div className="flex justify-between items-center text-sm text-gray-700">
					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 rounded border-gray-300"
							{...register('remember')}
						/>
						Lembrar
					</label>

					<a href="#" className="text-blue-700">
						Esqueceu a senha?
					</a>
				</div>
				<Button type="submit">Entrar</Button>
			</motion.form>
		</>
	);
}
