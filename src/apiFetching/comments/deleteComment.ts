export const deleteComment = async (comment_id: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/comments/commentMutation/${comment_id}`, {
            method: "DELETE",
        });
        if(!callApi.ok) {
            throw new Error("HTTP error")
        }
        const apiResponse = await callApi.json();
        return apiResponse;
    } catch(error) {
        console.log(error);
        return {error: "Something went wrong! please try again"};
    }
}