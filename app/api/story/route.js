import Story from "@models/story";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();
        const story = await Story.find({}).populate('creator')

        return new Response(JSON.stringify(story), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all story",{status: 500})
    }
}