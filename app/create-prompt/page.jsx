'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const [submitting, setSubmitting] = useState(false);
	const [prompt, setPrompt] = useState({
		prompt: '',
		tag: '',
	});

	const createPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					prompt: prompt.prompt,
					userId: session?.user.id,
					tag: prompt.tag,
				}),
			});

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log('error in create prompt: ' + error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type='Create'
			post={prompt}
			setPost={setPrompt}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;
