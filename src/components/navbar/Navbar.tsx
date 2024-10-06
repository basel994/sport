import Image from "next/image";
import styles from "./navbar.module.css";
import { cookies } from "next/headers";
import { tokenDecode } from "@/functions/tokenDecode";

export default async function Navbar() {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    
    return(
        <nav className={styles.navbar}>
            <Image src="/images/logo.ico" alt="" width={40} height={40} />
            <p className={styles.brand}>Welcome To Basel Sport App</p>
            <p className={styles.userName}>{token?tokenDecode(token.value).name:""}</p>
        </nav>
    );
}