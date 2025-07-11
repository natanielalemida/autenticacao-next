import { z } from 'zod';

export const loginSchema = z.object({
	email: z.email({ message: 'Email inválido' }),
	password: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
	remember: z.boolean().optional(),
});

export const registerSchema = z
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
		path: ['confirmPassword'],
		message: 'As senhas precisam ser iguais',
	});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
