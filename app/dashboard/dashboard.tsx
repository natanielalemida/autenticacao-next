'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'next-auth/react'; // Importa o signOut

type User = {
	id: string;
	email: string;
	createdAt: string;
	updatedAt: string;
};

export default function DashboardClient() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUsers() {
			try {
				const res = await fetch('/api/users');
				if (!res.ok) throw new Error('Falha ao buscar usuários');
				const data: User[] = await res.json();
				setUsers(data);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		}
		fetchUsers();
	}, []);

	return (
		<main className="p-6 mx-auto h-screen bg-gray-100">
			{/* Botão Sign Out no topo, alinhado à direita */}
			<div className="flex justify-end mb-4">
				<button
					onClick={() => signOut()}
					className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
					type="button"
				>
					Sair
				</button>
			</div>

			<motion.h1
				className="text-3xl font-bold mb-6 text-center"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				Usuários Cadastrados
			</motion.h1>

			<AnimatePresence>
				{loading && (
					<motion.p
						className="text-center text-gray-600"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						Carregando usuários...
					</motion.p>
				)}

				{error && (
					<motion.p
						className="text-center text-red-600"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						Erro: {error}
					</motion.p>
				)}

				{!loading && !error && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						className="overflow-x-auto"
					>
						{users.length === 0 ? (
							<p className="text-center text-gray-500">
								Nenhum usuário encontrado.
							</p>
						) : (
							<table className="w-full text-sm border border-gray-200 shadow-sm rounded-lg overflow-hidden">
								<thead className="bg-gray-100 text-gray-700">
									<tr>
										<th className="p-3 text-left">ID</th>
										<th className="p-3 text-left">Email</th>
										<th className="p-3 text-left">Criado em</th>
										<th className="p-3 text-left">Atualizado em</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user) => (
										<motion.tr
											key={user.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.2 }}
											className="even:bg-gray-50 hover:bg-gray-100 transition"
										>
											<td className="p-3 break-all text-gray-800">{user.id}</td>
											<td className="p-3 break-all text-gray-800">
												{user.email}
											</td>
											<td className="p-3 break-all text-gray-800">
												{new Date(user.createdAt).toLocaleString()}
											</td>
											<td className="p-3 break-all text-gray-800">
												{new Date(user.updatedAt).toLocaleString()}
											</td>
										</motion.tr>
									))}
								</tbody>
							</table>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	);
}
