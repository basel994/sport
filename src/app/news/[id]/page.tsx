import NewDetail from "@/components/News/NewDetails";
import styles from "./page.module.css";

export default function NewDetails({params}: {params: {id: string}}) {
    return(
        <div className={styles.container}>
            <NewDetail newId={params.id} />
        </div>
    );
}