export async function checkUser(email: string, password: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/login`, {
            method: "POST",
            body: JSON.stringify({email,password})
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