export const userDetailsFetching = async (id: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/users/${id}`);
        if(!callApi.ok) {
            throw new Error("HTTP error")
        }
        const apiResponse = await callApi.json();
        return apiResponse.length > 0 ? apiResponse[0] : null;
    } catch(error) {
        console.log(error);
        return null;
    }
}