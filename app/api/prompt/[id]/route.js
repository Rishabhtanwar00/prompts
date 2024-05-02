import connectToDB from '@utils/database';
import Prompt from '@models/prompt';

//get
export const GET = async (request, { params }) => {
	try {
		await connectToDB();
		const prompt = await Prompt.findById(params.id).populate('creator');

		if (!prompt) {
			return new Response('Prompt not found', { status: 404 });
		}

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		console.log('error: ' + error);
		return new Response('failed to fetch prompt by id', { status: 500 });
	}
};

//patch - update
export const PATCH = async (request, { params }) => {
	const { prompt, tag } = await request.json();
	try {
		await connectToDB();

		const existingPrompt = await Prompt.findById(params.id);

		if (!existingPrompt) {
			return new Response('Prompt not found', { status: 404 });
		}

		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();

		return new Response('updated the prompt successfully', { status: 200 });
	} catch (error) {
		return new Response('failed to update prompt by id', { status: 500 });
	}
};

//delete
export const DELETE = async (request, { params }) => {
	try {
		await connectToDB();

		await Prompt.findByIdAndDelete(params.id);

		return new Response('deleted the prompt successfully', { status: 200 });
	} catch (error) {
		return new Response('failed to delete prompt by id', { status: 500 });
	}
};
