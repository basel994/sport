import { commentsFetching } from "@/apiFetching/comments/commentsFetching";
import styles from "./comments.module.css";
import Image from "next/image";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { userDetailsFetching } from "@/apiFetching/users/getUserDetails";

export default async function Comments({new_id}: {new_id: string}) {
    const commentsFetch = await commentsFetching(new_id);
    return(
        <div className={styles.comments}>
            <div className={styles.header}>
                <Image src="/images/home/new/comments.ico" alt="" width={30} height={30} />
                <h3>Comments: {commentsFetch.length}</h3>
            </div>
            {commentsFetch.map(async(comment) => {
                const userDetails: {name: string, image?: string}= await userDetailsFetching((String(comment.user_id)));
                return(
                    <Comment key={comment.id} comment={comment} userDetails={userDetails} />
                );
            })
            }
            <AddComment new_id = {new_id} />
        </div>
    );
}