import Image from "next/image";
import styles from "./navbar.module.css";

export default function Navbar() {
    return(
        <nav className={styles.navbar}>
            <Image src="/images/logo.ico" alt="" width={40} height={40} />
            <p className={styles.brand}>Welcome To Basel Sport App</p>
        </nav>
    );
}