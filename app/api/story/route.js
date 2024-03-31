import Story from "@models/story";
import { connectToDB } from "@utils/database";
import { headers } from "next/headers";

export const GET = async (request) => {
    const headersList = headers();
    const referer = headersList.get('referer');

    try {
        await connectToDB();
        const story = await Story.find({}).populate('creator')

        return new Response(JSON.stringify(story), {
            status: 200,
            headers: {
                referer: referer,
                'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
            },
        })
    } catch (error) {
        return new Response("Failed to fetch all story",{status: 500})
    }
}