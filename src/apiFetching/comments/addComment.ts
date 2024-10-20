export const addComment = async (comment: FormData) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/comments`, {
            method: "POST",
            body: comment,
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