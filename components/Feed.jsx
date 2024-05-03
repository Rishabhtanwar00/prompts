'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((prompt) => (
				<PromptCard
					key={prompt._id}
					prompt={prompt}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState('');
	const [prompts, setPrompts] = useState([]);

	const handleSearch = (e) => {};

	useEffect(() => {
		(async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();
			console.log('feed:' + data);
			setPrompts(data);
		})();
	}, []);

	return (
		<section className='feed'>
			<form action='' className='w-full relative flex-center'>
				<input
					type='text'
					placeholder='search for a tag or a username'
					value={searchText}
					onChange={handleSearch}
					required
					className='search_input peer'
				/>
			</form>
			<PromptCardList data={prompts} handleTagClick={() => {}} />
		</section>
	);
};

export default Feed;
