import { useForm } from 'react-hook-form';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from '../schema/loginSchema';
import useLogin from '../hooks/useLogin';
import { motion } from 'framer-motion';
import { Toast } from '../components/toast';
import { useToast } from '../hooks/useToast';

export default function RegisterForm() {
	const { toastMessage, showToast, closeToast } = useToast();
	const { onRegister } = useLogin(showToast);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

	return (
		<>
			{toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
			<motion.form
				onSubmit={handleSubmit(onRegister)}
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
				<div>
					<label className="text-sm text-gray-700">Confirmar senha</label>
					<Input
						type="password"
						placeholder="Digite a mesma senha"
						{...register('confirmPassword')}
					/>
					{errors.confirmPassword && (
						<p className="text-red-500 text-sm">
							{errors.confirmPassword.message}
						</p>
					)}
				</div>
				<label className="flex items-center text-sm text-gray-700">
					<input type="checkbox" {...register('terms')} className="mr-2" />
					Concordo com os termos
				</label>
				{errors.terms && (
					<p className="text-red-500 text-sm">{errors.terms.message}</p>
				)}
				<Button type="submit">Cadastrar</Button>
			</motion.form>
		</>
	);
}
