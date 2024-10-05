import { NewType } from "@/types/news/newsTypes";

export const newsFetching = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/news`, {cache: "no-store",});
        if(!callApi.ok) {
            throw new Error("HTTP error")
        }
        const apiResponse: NewType[] = await callApi.json();
        return apiResponse;
    } catch(error) {
        console.log(error);
        return [];
    }
}