'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [prompts, setPrompts] = useState([]);
	useEffect(() => {
		if (session?.user.id)
			(async () => {
				const response = await fetch(`/api/users/${session?.user.id}/prompts`);
				const data = await response.json();

				setPrompts(data);
			})();
	}, [session?.user.id]);

	const handleEdit = (prompt) => {
		router.push(`/update-prompt?id=${prompt._id}`);
	};
	const handleDelete = async (prompt) => {
		const hasConfirmation = confirm(
			'Are you sure you want to delete this prompt?'
		);

		if (hasConfirmation) {
			try {
				await fetch(`api/prompt/${prompt._id.toString()}`, {
					method: 'DELETE',
				});

				const filteredPrompts = prompts.filter((p) => p._id !== prompt._id);

				setPrompts(filteredPrompts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<Profile
			name='My'
			desc='Welcome to your personalized profile page'
			data={prompts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
