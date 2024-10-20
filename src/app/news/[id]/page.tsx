import NewDetail from "@/components/News/NewDetails";
import styles from "./page.module.css";
import Comments from "@/components/commets/comments";
import { Suspense } from "react";
import CommentsPlaceholder from "@/components/commets/commentsPlaceholder/CommentsPlaceholder";

export default function NewDetails({params}: {params: {id: string}}) {
    return(
        <div className={styles.container}>
            <NewDetail newId={params.id} />
            <Suspense fallback={<CommentsPlaceholder />} >
                <Comments new_id={params.id}/>
            </Suspense>
        </div>
    );
}