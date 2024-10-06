import PageHeader from "@/components/pageHeader/PageHeader";
import styles from "./page.module.css";
import Login from "@/components/auth/login/Login";

export default function Page() {
    return(
        <div className={styles.container}>
            <PageHeader title="Login" icon="/images/auth/login/login.ico" />
            <Login />
        </div>
    );
}