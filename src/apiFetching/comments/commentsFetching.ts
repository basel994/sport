import { commentType } from "@/types/comments/commentType";

export const commentsFetching = async (new_id: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/comments/${new_id}`, {cache: "no-store", next: {tags: ['comments']}});
        if(!callApi.ok) {
            throw new Error("HTTP error")
        }
        const apiResponse: commentType[] = await callApi.json();
        return apiResponse;
    } catch(error) {
        console.log(error);
        return [];
    }
}