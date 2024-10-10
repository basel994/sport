import { commentsFetching } from "@/apiFetching/comments/commentsFetching";
import styles from "./comments.module.css";
import { userDetailsFetching } from "@/apiFetching/users/getUserDetails";
import Image from "next/image";
export default async function Comments({new_id}: {new_id: string}) {
    const commentsFetch = await commentsFetching(new_id);
    return(
        <div className={styles.comments}>
            <h3>Comments: {commentsFetch.length}</h3>
            {commentsFetch.map(async(comment) => {
                const userDetails= await userDetailsFetching((String(comment.user_id)));
                return(
                    <div key={comment.id} className={styles.comment}>
                        <div className={styles.user}>
                            {userDetails?.image && <Image src={userDetails.image} alt="" width={30} height={30} />}
                            <h3>{userDetails?.name}</h3>
                        </div>
                        <p>{comment.content}</p>
                    </div>
                );
            })}
        </div>
    );
}