import Image from "next/image";
import styles from "./navbar.module.css";

export default async function Navbar({user}: {user: string|undefined}) { 
    return(
        <nav className={styles.navbar}>
            <Image src="/images/logo.ico" alt="" width={40} height={40} />
            <p className={styles.brand}>Welcome To Basel Sport App</p>
            {
                user&&<p className={styles.userName}>{user}</p>
            }
        </nav>
    );
}