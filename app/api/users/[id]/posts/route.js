import Story from '@models/story';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const story = await Story.find({ creator: params.id }).populate("creator")
        
        return new Response(JSON.stringify(story), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch story created by user",{status: 500})
    }
}