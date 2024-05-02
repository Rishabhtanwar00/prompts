'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);

	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		(async () => {
			const response = await getProviders();
			setProviders(response);
		})();
	}, []);

	return (
		<nav className='w-full flex-between mb-16 pt-3'>
			<Link href='/' className='flex flex-center gap-2'>
				<Image
					src='assets/images/logo.svg'
					alt='prompts logo'
					width={30}
					height={30}
					className='object-contain'
				/>
				<p className='logo_text'>Prompts</p>
			</Link>
			{/* Desktop Navigation */}
			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-prompt' className='black_btn'>
							Create Post
						</Link>
						<button type='button' onClick={signOut} className='outline_btn'>
							Sign Out
						</button>

						<Link href='/profile'>
							<Image
								src={session?.user.image}
								height={37}
								width={37}
								alt='profile'
								className='rounded-full'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className='black_btn'
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
			{/* Mobile Navigation */}
			<div className='sm:hidden flex'>
				{session?.user ? (
					<div className='flex relative'>
						<Image
							src={session?.user.image}
							height={37}
							width={37}
							alt='profile'
							className='rounded-full'
							onClick={() => {
								setToggleDropdown((prev) => !prev);
							}}
						/>
						{toggleDropdown && (
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_link'
									onClick={() => {
										setToggleDropdown(false);
									}}
								>
									My Profile
								</Link>
								<Link
									href='/create-prompt'
									className='dropdown_link'
									onClick={() => {
										setToggleDropdown(false);
									}}
								>
									Create Prompt
								</Link>
								<button
									type='button'
									className='black_btn mt-2 w-full'
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
								>
									{' '}
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className='black_btn'
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
