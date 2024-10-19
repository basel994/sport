import styles from "./page.module.css";
import PageHeader from "@/components/pageHeader/PageHeader";

export default function Dashboard() {
    return(
        <div className={styles.container}>
            <PageHeader title="Dashboard" icon="/images/dashboard/dashboard.ico" />
        </div>
    );
}