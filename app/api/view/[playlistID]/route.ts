import { connectToDB } from "@/utils/database";


export const GET = async (req: Request, { params }: {params: {playlistID: string}}) => {
  try {
    await connectToDB();
    return new Response(JSON.stringify({message: `Hello from backend, found ${params.playlistID}`}), { status: 200,   headers: { 'Cache-Control': 'no-store' }, })
  } catch (error) {
    console.log("Error fetching prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 501 })
  }
}

export const revalidate = 0;