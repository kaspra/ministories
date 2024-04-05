import Story from "@models/story";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const story = await Story.findById(params.id).populate("creator")

        if (!story) return new Response("Story Not Found", { status: 404 });
        return new Response(JSON.stringify(story),{status: 200})
    } catch(err) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { img, title, story, tag } = await request.json();
    try {
        await connectToDB();
        
        const existingStory = await Story.findById(params.id);

        if (!existingStory) return new Response("Story not found", { status: 404 });

        existingStory.img = img;
        existingStory.title = title;
        existingStory.tag = tag;
        existingStory.story = story;

        await existingStory.save();

        return new Response("Successfully updated the Story", { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", {status: 500})
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Story.findByIdAndDelete(params.id);
        return new Response("Story Deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting story", { status: 500 });
    }
}