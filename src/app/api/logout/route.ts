import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookiesStore = cookies();
    try {
        cookiesStore.delete("token");
        return NextResponse.json({message: "Logout successfull"});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "failed logout!"})
    }
}