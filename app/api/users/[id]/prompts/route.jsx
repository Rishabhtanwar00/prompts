import connectToDB from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {
	try {
		await connectToDB();
		console.log(params.id);
		const prompts = await Prompt.find({ creator: params.id }).populate(
			'creator'
		);

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		console.log('error: ' + error);
		return new Response('failed to fetch prompts for id', { status: 500 });
	}
};
