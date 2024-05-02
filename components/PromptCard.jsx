'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ prompt, handleTagCLick, handleEdit, handleDelete }) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();

	const [copied, setCopied] = useState('');

	const handleCopy = () => {
		setCopied(prompt.prompt);
		navigator.clipboard.writeText(prompt.prompt);
		setTimeout(() => setCopied(''), 3000);
	};

	return (
		<div className='prompt_card'>
			<div className='flex items-start justify-between gap-5'>
				<div className='flex flex-1 items-center justify-between gap-3 cursor-pointer'>
					<Image
						src={prompt.creator.image}
						alt='user-image'
						height={40}
						width={40}
						className='rounded-full object-contain'
					/>

					<div className='flex flex-col'>
						<h3 className='font-satoshi font-semibold text-gray-900'>
							{prompt.creator.username}
						</h3>
						<p className='font-inter text-sm text-gray-500'>
							{prompt.creator.email}
						</p>
					</div>

					<div className='copy_btn' onClick={handleCopy}>
						<Image
							width={10}
							height={10}
							alt='copy-btn'
							src={
								copied === prompt.prompt
									? '/assets/icons/tick.svg'
									: '/assets/icons/copy.svg'
							}
						/>
					</div>
				</div>
			</div>
			<p className='mt-4 font-satoshi text-sm test-gray-700'>{prompt.prompt}</p>
			<p
				className='font-inter text-sm blue_gradient cursor-pointer'
				onClick={handleTagCLick && handleTagCLick(prompt.tag)}
			>
				{prompt.tag}
			</p>

			{session?.user.id === prompt.creator._id && pathName === '/profile' && (
				<div className='mt-5 flex-center gap-4 border-t border-gray-200 pt-3'>
					<p
						className='font-inter text-sm green_gradient cursor-pointer'
						onClick={handleEdit}
					>
						Edit
					</p>
					<p
						className='font-inter text-sm orange_gradient cursor-pointer'
						onClick={handleDelete}
					>
						Delete
					</p>
				</div>
			)}
		</div>
	);
};

export default PromptCard;
