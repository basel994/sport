export async function registerProcess(email: string, name: string, password: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/register`, {
            method: "POST",
            body: JSON.stringify({email, name, password})
        });
        if(!callApi.ok) {
            throw new Error("HTTP error")
        }
        const apiResponse = await callApi.json();
        return apiResponse;
    } catch(error) {
        console.log(error);
        return null;
    }
}