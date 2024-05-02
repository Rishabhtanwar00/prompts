'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');
	const router = useRouter();

	const [submitting, setSubmitting] = useState(false);
	const [prompt, setPrompt] = useState({
		prompt: '',
		tag: '',
	});

	useEffect(() => {
		if (promptId)
			(async () => {
				const result = await fetch(`/api/prompt/${promptId}`);
				const data = await result.json();

				setPrompt({
					prompt: data.prompt,
					tag: data.tag,
				});
			})();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) return alert('Missing PromptId!');

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: prompt.prompt,
					tag: prompt.tag,
				}),
			});

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log('error in edit prompt: ' + error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type='Edit'
			post={prompt}
			setPost={setPrompt}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};

export default EditPrompt;
