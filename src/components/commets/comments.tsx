import { commentsFetching } from "@/apiFetching/comments/commentsFetching";
import styles from "./comments.module.css";
import { userDetailsFetching } from "@/apiFetching/users/getUserDetails";
import Image from "next/image";
import { dateForm } from "@/functions/dateForm";
import AddComment from "./AddComment";

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
                    <div key={comment.id} className={styles.comment}>
                        <div className={styles.info}>
                            <div className={styles.user}>
                                {
                                    <Image src={userDetails.image ? userDetails.image : "/images/home/new/noImage.ico"} alt="" width={40} height={40} />
                                }
                                <h4>{userDetails?.name}</h4>
                            </div>
                            <p className={styles.date}>{dateForm(comment.created_at)}</p>
                        </div>
                        <p>{comment.content}</p>
                    </div>
                );
            })}
            <AddComment new_id = {new_id} />
        </div>
    );
}