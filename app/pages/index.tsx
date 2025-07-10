'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '../styles/colors';
import { Button } from '../components/button';
import { Input } from '../components/input';

// SCHEMAS
const loginSchema = z.object({
	email: z.email({ message: 'E-mail inválido' }),
	password: z
		.string()
		.min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
});

const registerSchema = z
	.object({
		email: z.email({ message: 'E-mail inválido' }),
		password: z
			.string()
			.min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
		confirmPassword: z.string().min(1, { message: 'Confirme sua senha' }),
		terms: z.boolean().refine((val) => val === true, {
			message: 'Você precisa aceitar os termos',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas precisam ser iguais',
		path: ['confirmPassword'],
	});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		await signIn('credentials', {
			email: data.email,
			password: data.password,
			callbackUrl: '/dashboard',
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div>
				<label className="text-sm">Email</label>
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
				<label className="text-sm">Senha</label>
				<Input
					type="password"
					placeholder="min. 8 caracteres"
					{...register('password')}
				/>
				{errors.password && (
					<p className="text-red-500 text-sm">{errors.password.message}</p>
				)}
			</div>

			<div className="flex items-center justify-between text-sm">
				<label className="flex items-center">
					<input type="checkbox" className="mr-2" /> Lembrar
				</label>
				<a href="#" className="text-blue-700">
					Esqueceu a senha?
				</a>
			</div>

			<Button>Entrar</Button>
		</form>
	);
}

function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			terms: false,
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		const res = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (res.ok) {
			await signIn('credentials', {
				email: data.email,
				password: data.password,
				callbackUrl: '/dashboard',
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div>
				<label className="text-sm">Email</label>
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
				<label className="text-sm">Senha</label>
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
				<label className="text-sm">Confirmar senha</label>
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

			<label className="flex items-center text-sm">
				<input type="checkbox" {...register('terms')} className="mr-2" />
				Concordo com os termos
			</label>
			{errors.terms && (
				<p className="text-red-500 text-sm">{errors.terms.message}</p>
			)}

			<Button>Cadastrar</Button>
		</form>
	);
}

export default function AuthPage() {
	const [isRegister, setIsRegister] = useState(false);

	return (
		<main className="flex min-h-screen">
			{/* Left */}
			<div className="w-1/2 flex flex-col justify-center items-center p-12">
				<div className="w-full max-w-md">
					<img src="/small_logo.svg" alt="Logo" className="mb-10" />

					<div className="flex gap-4 mb-8 bg-[#F3F3F3] p-1 rounded-full w-fit">
						<button
							className={`px-4 py-2 text-sm rounded-full transition-colors ${
								!isRegister
									? 'bg-white text-black font-medium'
									: 'text-gray-500'
							}`}
							onClick={() => setIsRegister(false)}
						>
							Entrar
						</button>
						<button
							className={`px-4 py-2 text-sm rounded-full transition-colors ${
								isRegister ? 'bg-white text-black font-medium' : 'text-gray-500'
							}`}
							onClick={() => setIsRegister(true)}
						>
							Cadastrar
						</button>
					</div>

					<h2 className="text-2xl font-bold mb-2">
						{isRegister ? 'Cadastrar' : 'Entrar'}
					</h2>
					<p className="text-sm text-gray-500 mb-6">
						Non sit purus tempus malesuada poten
					</p>

					{isRegister ? <RegisterForm /> : <LoginForm />}

					<p className="text-sm text-center mt-4">
						{isRegister ? (
							<>
								Já tem conta?{' '}
								<button
									onClick={() => setIsRegister(false)}
									className="text-blue-700 font-medium"
								>
									Entre aqui
								</button>
							</>
						) : (
							<>
								Ainda não tem conta?{' '}
								<button
									onClick={() => setIsRegister(true)}
									className="text-blue-700 font-medium"
								>
									Assine agora
								</button>
							</>
						)}
					</p>
				</div>
			</div>

			{/* Right */}
			<div className="w-1/2 bg-[#F6F6FB] flex flex-col justify-center items-center relative overflow-hidden">
				<div className="absolute w-[400px] h-[400px] bg-[#002F99] rounded-full -top-40 -left-40"></div>
				<div className="absolute w-[300px] h-[300px] bg-[#3CE0C3] rounded-full -bottom-32 -right-32"></div>
				<h1 className="text-4xl font-bold text-center px-8">
					A Revolução do <br /> Marketing por{' '}
					<span style={{ color: colors.secondary }}>Influência</span>
				</h1>
			</div>
		</main>
	);
}
