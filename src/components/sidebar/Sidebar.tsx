"use client"
import Link from "next/link";
import styles from "./sidebar.module.css";
import { useUser } from "@/context/userContext";
export default function Sidebar() {
    const{ user } = useUser();
    return(
        <div className={styles.side}>
            <h1>side navbar</h1>
            <div className={styles.links}>
                <Link href="/">Home</Link>
                <Link href="/login">Login</Link>
                {
                    user?.role === "admin" && <Link href="/dashboard">Dashboard</Link>
                }
                {
                    user && <button>Logout</button>
                }
            </div>
        </div>
    );
}