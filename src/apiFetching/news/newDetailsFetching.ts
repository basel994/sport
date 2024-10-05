import { NewType } from "@/types/news/newsTypes";

export const newDetailsFetching = async ({id}: {id: string}) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/news/${id}`);
        if(!callApi.ok) {
            throw new Error("HTTP error")
        }
        const apiResponse: NewType[] = await callApi.json();
        return apiResponse.length > 0 ? apiResponse[0] : null;
    } catch(error) {
        console.log(error);
        return null;
    }
}