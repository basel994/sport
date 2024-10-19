import PageHeader from "@/components/pageHeader/PageHeader";
import styles from "./page.module.css";
import Register from "@/components/auth/register/Register";

export default function Page() {
    return(
        <div className={styles.container}>
            <PageHeader title="Register" />
            <Register />
        </div>
    );
}