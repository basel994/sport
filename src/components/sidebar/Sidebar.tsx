import Link from "next/link";
import styles from "./sidebar.module.css";
export default function Sidebar() {
    return(
        <div className={styles.side}>
            <h1>side navbar</h1>
            <div className={styles.links}>
                <Link href="/">Home</Link>
                <Link href="/login">Login</Link>
            </div>
        </div>
    );
}