import { signIn } from 'next-auth/react';
import { LoginFormData, RegisterFormData } from '../schema/loginSchema';

export default function useLogin(showError: (msg: string) => void) {
	const onLogin = async (data: LoginFormData) => {
		const result = await signIn('credentials', {
			callbackUrl: '/dashboard',
			email: data.email,
			password: data.password,
			remember: data.remember ? 'true' : 'false',
		});

		if (result?.error) {
			showError('Erro no login: ' + result.error);
			return;
		}

		if (result?.ok && result.url) {
			window.location.href = result.url;
		}
	};

	const onRegister = async (data: RegisterFormData) => {
		const res = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		});

		if (res.ok) {
			await signIn('credentials', {
				redirect: true,
				email: data.email,
				password: data.password,
				callbackUrl: '/dashboard',
			});
		} else {
			showError('Erro no cadastro. Tente novamente.');
		}
	};

	return { onLogin, onRegister };
}
