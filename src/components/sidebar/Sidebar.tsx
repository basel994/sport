"use client"
import Link from "next/link";
import styles from "./sidebar.module.css";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
export default function Sidebar() {
    const router = useRouter();
    const{ user, setUser } = useUser();
    const logoutHandle = async() => {
        const logoutApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
            method: "POST",
        });
        const logoutResponse = await logoutApi.json();
        if(logoutResponse.error){
            console.log(logoutResponse.error);
        }
        else {
            setUser(null);
            console.log(logoutResponse.message);
            router.push("/");
        }
    }
    return(
        <div className={styles.side}>
            <h1>side navbar</h1>
            <div className={styles.links}>
                <Link href="/">Home</Link>
                {
                    !user && <Link href="/login">Login</Link>
                }
                {
                    user?.role === "admin" && <Link href="/dashboard">Dashboard</Link>
                }
                {
                    user && <button onClick={logoutHandle}>Logout</button>
                }
            </div>
        </div>
    );
}