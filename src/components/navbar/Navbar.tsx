"use client"
import Image from "next/image";
import styles from "./navbar.module.css";
import { useUser } from "@/context/userContext";
export default function Navbar() { 
    const {user} = useUser();
    return(
        <nav className={styles.navbar}>
            <div className={styles.brand}>
                <Image src="/images/logo.ico" alt="" width={40} height={40} />
                <p>Welcome To Basel Sport App</p>
            </div>
            {
                user && <div className={styles.users}>
                    <Image src={user.image ? user.image : "/images/users/noImage.ico"} alt="" width={30} height={30} />
                    <p className={styles.userName}>{user.name}</p>
                </div>
            }
            
        </nav>
    );
}