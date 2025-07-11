'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import RegisterForm from './registerForm';
import { LoginForm } from './loginForm';

export default function AuthPage() {
	const [isRegister, setIsRegister] = useState(false);

	return (
		<main className="min-h-screen w-full flex bg-white">
			{/* Mobile background - só visível no mobile */}
			<div className="fixed inset-0 z-0 md:hidden bg-white">
				<img
					src="/fundo.svg"
					alt="Mobile Background"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Conteúdo: Form no lado esquerdo (mobile: full width; desktop: 1/2) */}
			<div className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
				<div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
					<div className="mb-6 flex justify-center">
						<img src="/small_logo.svg" alt="TamoJunto" className="h-6" />
					</div>

					<div className="flex bg-[#F3F3F3] rounded-full p-1 mb-6 w-full justify-between">
						<button
							onClick={() => setIsRegister(false)}
							className={`w-1/2 py-2 rounded-full text-sm ${
								!isRegister
									? 'bg-white font-semibold text-black'
									: 'text-gray-500'
							}`}
						>
							Entrar
						</button>
						<button
							onClick={() => setIsRegister(true)}
							className={`w-1/2 py-2 rounded-full text-sm ${
								isRegister
									? 'bg-white font-semibold text-black'
									: 'text-gray-500'
							}`}
						>
							Cadastrar
						</button>
					</div>

					<h2 className="text-xl font-bold mb-1 text-black">
						{isRegister ? 'Cadastrar' : 'Entrar'}
					</h2>
					<p className="text-sm text-gray-700 mb-4">
						Non sit purus tempus malesuada poten
					</p>

					<AnimatePresence mode="wait" initial={false}>
						{isRegister ? (
							<RegisterForm key="register" />
						) : (
							<LoginForm key="login" />
						)}
					</AnimatePresence>

					<div className="flex items-center my-4">
						<hr className="flex-grow border-t" />
						<span className="mx-2 text-sm text-gray-400">ou</span>
						<hr className="flex-grow border-t" />
					</div>

					<button className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition">
						<img src="/google-icon-logo.svg" alt="Google" className="h-4" />
						Entrar com o Google
					</button>

					<p className="text-center text-sm mt-6 text-gray-700">
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

			{/* Fundo do lado direito no desktop */}
			<div className="hidden md:flex w-1/2 relative overflow-hidden bg-white">
				<img
					src="/fundo.svg"
					alt="Desktop Background"
					className="absolute inset-0 w-full h-full object-cover"
					style={{ objectPosition: 'center' }}
				/>
				<div className="relative z-10 flex items-center justify-center h-full px-8">
					<h2 className="text-3xl font-bold text-black max-w-md text-center">
						A Revolução do Marketing por{' '}
						<span className="text-[#3CE0C3]">Influência</span>
					</h2>
				</div>
			</div>
		</main>
	);
}
