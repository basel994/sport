import NewDetail from "@/components/News/NewDetails";
import styles from "./page.module.css";
import Comments from "@/components/commets/comments";

export default function NewDetails({params}: {params: {id: string}}) {
    return(
        <div className={styles.container}>
            <NewDetail newId={params.id} />
            <Comments new_id={params.id}/>
        </div>
    );
}